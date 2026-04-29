require('dotenv').config({ path: 'e:/horology/backend/.env' });
const nodemailer = require('nodemailer');

async function testMail() {
  console.log('Testing with User:', process.env.EMAIL_USER);
  console.log('Testing with Pass length:', process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0);

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Test email from Antigravity",
      text: "If you get this, the credentials work perfectly."
    });
    console.log("Success! Message ID:", info.messageId);
  } catch (err) {
    console.error("Failed to send email!");
    console.error(err);
  }
}

testMail();
