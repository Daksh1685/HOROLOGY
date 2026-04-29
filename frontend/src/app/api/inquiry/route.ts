import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { firstName, lastName, email, phone, timepiece, details } = data;

    if (!firstName || !email || !timepiece) {
      return NextResponse.json({ success: false, message: 'Required fields are missing' }, { status: 400 });
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.INQUIRY_MAIL) {
      return NextResponse.json({ 
        success: false, 
        message: 'Mail configuration is missing on Vercel. Please add EMAIL_USER, EMAIL_PASS, and INQUIRY_MAIL to Vercel Environment Variables.' 
      }, { status: 500 });
    }

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

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Inquiry submitted successfully' });
  } catch (error: any) {
    console.error('Vercel Mail Error:', error);
    return NextResponse.json({ success: false, message: `Vercel Mail Error: ${error.message}` }, { status: 500 });
  }
}
