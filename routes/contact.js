const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/send-email', (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;
  const fullName = `${firstName} ${lastName}`;

  // Create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'site.contactform01@gmail.com',  // Your form email
      pass: 'mrld pelh yeav aqtq'             // App password (never share publicly)
    }
  });

  const mailOptions = {
    from: `"${fullName}" <site.contactform01@gmail.com>`,
    replyTo: `"${fullName}" <${email}>`,
    to: "eulercivil2019@gmail.com",  // Where you want to receive the emails
    subject: `Website Contact Form Submission from ${fullName}`,
    messageId: `<form-${Date.now()}-${Math.random().toString(36).substring(2, 15)}@yourdomain.com>`,
    headers: {
      'X-Entity-Ref-ID': `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`
    },
    text: `You have received a new message from ${fullName} (${email}):\n\nPhone: ${phone}\n\nMessage:\n${message}`,
    html: `
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ success: false, message: 'Error in sending email', error });
    }
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  });
});

module.exports = router;