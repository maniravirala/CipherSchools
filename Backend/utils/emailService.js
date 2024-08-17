const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can use other services like Mailgun, SendGrid, etc.
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: 'Test Platform <no-reply@testplatform.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html // If you want to send HTML email
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
