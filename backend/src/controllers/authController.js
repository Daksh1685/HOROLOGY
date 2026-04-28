const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ success: false, message: 'All fields are required' });
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ success: false, message: 'Email already registered' });
    const user = await User.create({
      name,
      email,
      password,
      passwordSet: true
    });
    res.status(201).json({
      success: true,
      data: { _id: user._id, name: user.name, email: user.email, role: user.role, token: generateToken(user._id) },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password required' });
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    res.json({
      success: true,
      data: { _id: user._id, name: user.name, email: user.email, role: user.role, token: generateToken(user._id) },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleAuth = async (req, res) => {
  try {
    const { credential } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub: googleId, name, email, picture: avatar } = payload;

    let user = await User.findOne({ email }).select('+password');
    let isNewUser = false;
    
    if (user) {
      user.googleId = googleId;
      if (avatar && !user.avatar) user.avatar = avatar;
      await user.save();
    } else {
      user = await User.create({ 
        name, 
        email, 
        googleId, 
        avatar, 
        password: Math.random().toString(36).slice(-12) + '!', 
        passwordSet: false
      });
      isNewUser = true;
    }

    const hasPasswordSet = user.passwordSet && !isNewUser;

    res.json({
      success: true,
      data: { 
        _id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role, 
        token: generateToken(user._id),
        needsPassword: !hasPasswordSet
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Google authentication failed: ' + error.message });
  }
};
