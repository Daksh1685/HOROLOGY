const Favorite = require('../models/Favorite');
const User = require('../models/User');

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateMe = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;
    const user = await User.findById(req.user._id).select('+password');

    if (name) user.name = name;
    if (email) user.email = email;
    if (avatar) user.avatar = avatar;
    if (password) {
      user.password = password;
      user.passwordSet = true;
    }

    await user.save();
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user._id }).populate('watch').sort({ createdAt: -1 });
    res.json({ success: true, data: favorites });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addFavorite = async (req, res) => {
  try {
    const { watchId, collectionName, notes, isWishlist } = req.body;
    if (!watchId) return res.status(400).json({ success: false, message: 'watchId is required' });
    const favorite = await Favorite.findOneAndUpdate(
      { user: req.user._id, watch: watchId },
      { user: req.user._id, watch: watchId, collectionName, notes, isWishlist },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    await favorite.populate('watch');
    res.status(201).json({ success: true, data: favorite });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const result = await Favorite.findOneAndDelete({ user: req.user._id, watch: req.params.watchId });
    if (!result) return res.status(404).json({ success: false, message: 'Favorite not found' });
    res.json({ success: true, message: 'Removed from favorites' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.trackViewed = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $push: { viewedWatches: { $each: [{ watch: req.params.watchId }], $slice: -50 } },
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getViewed = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('viewedWatches.watch').select('viewedWatches');
    res.json({ success: true, data: user.viewedWatches });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
