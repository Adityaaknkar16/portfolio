import nodemailer from 'nodemailer';
import { validationResult } from 'express-validator';
import Contact from '../models/Contact.js';

export const submitContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { name, email, message } = req.body;

  try {
    // 1. Save to MongoDB
    const contact = new Contact({ name, email, message });
    await contact.save();

    // 2. Email alert via Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: `New Portfolio Message from ${name}`,
      text: `You have received a new message from your portfolio site:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h3>New Portfolio Contact Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Attempt to send email, catch errors but do not crash the response since it saved in DB
    try {
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        await transporter.sendMail(mailOptions);
        console.log('Nodemailer alert sent successfully.');
      } else {
        console.log('SMTP credentials not configured. Skipping email notification.');
      }
    } catch (mailError) {
      console.error('Nodemailer error: ', mailError);
    }

    return res.status(201).json({
      success: true,
      message: 'Contact form submitted and stored successfully.',
    });
  } catch (error) {
    console.error('Contact submission database error: ', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process submission. Please try again later.',
    });
  }
};
