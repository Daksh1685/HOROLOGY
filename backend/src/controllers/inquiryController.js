const nodemailer = require('nodemailer');

exports.sendInquiry = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, timepiece, details } = req.body;

    if (!firstName || !email || !timepiece) {
      return res.status(400).json({ success: false, message: 'Required fields are missing' });
    }

    // Configure the transporter
    // Note: For Gmail, you should use an App Password
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `"Horology Acquisition" <${process.env.EMAIL_USER}>`,
      to: process.env.INQUIRY_MAIL,
      subject: `New Inquiry: ${timepiece} - ${firstName} ${lastName}`,
      html: `
        <div style="font-family: 'Helvetica', 'Arial', sans-serif; max-width: 600px; margin: auto; padding: 40px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #1a1a1a; text-transform: uppercase; letter-spacing: 2px; font-weight: 300; border-bottom: 2px solid #cfa864; padding-bottom: 10px;">New Acquisition Inquiry</h2>
          
          <div style="margin-top: 30px;">
            <p style="font-size: 14px; color: #666; margin-bottom: 5px;">TIMEPIECE OF INTEREST</p>
            <p style="font-size: 18px; color: #1a1a1a; font-weight: bold; margin-top: 0;">${timepiece}</p>
          </div>

          <div style="display: flex; margin-top: 25px;">
            <div style="flex: 1;">
              <p style="font-size: 12px; color: #666; margin-bottom: 5px;">CLIENT NAME</p>
              <p style="font-size: 14px; color: #1a1a1a; margin-top: 0;">${firstName} ${lastName}</p>
            </div>
          </div>

          <div style="display: flex; margin-top: 15px;">
            <div style="flex: 1;">
              <p style="font-size: 12px; color: #666; margin-bottom: 5px;">EMAIL ADDRESS</p>
              <p style="font-size: 14px; color: #1a1a1a; margin-top: 0;">${email}</p>
            </div>
            <div style="flex: 1;">
              <p style="font-size: 12px; color: #666; margin-bottom: 5px;">PHONE NUMBER</p>
              <p style="font-size: 14px; color: #1a1a1a; margin-top: 0;">${phone || 'Not provided'}</p>
            </div>
          </div>

          <div style="margin-top: 25px; padding: 20px; background-color: #f9f9f9; border-radius: 5px;">
            <p style="font-size: 12px; color: #666; margin-bottom: 10px;">ADDITIONAL DETAILS</p>
            <p style="font-size: 14px; color: #1a1a1a; line-height: 1.6; margin-top: 0;">${details || 'No additional details provided.'}</p>
          </div>

          <p style="font-size: 10px; color: #999; margin-top: 40px; text-align: center; text-transform: uppercase; letter-spacing: 1px;">
            This inquiry was submitted via the Horology Luxury Platform.
          </p>
        </div>
      `
    };

    // Send the inquiry email
    await transporter.sendMail(mailOptions);
    console.log(`Inquiry email sent to ${process.env.INQUIRY_MAIL}`);

    res.status(200).json({ success: true, message: 'Inquiry submitted successfully' });
  } catch (error) {
    console.error('Inquiry submission error:', error);
    if (error.code === 'EAUTH') {
      console.error('SMTP Authentication Error: Please ensure you are using a Gmail App Password, not your regular password.');
    }
    res.status(500).json({ success: false, message: 'Internal server error during inquiry submission' });
  }
};
