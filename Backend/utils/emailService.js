const nodemailer = require("nodemailer");
const User = require("../models/userModel"); // Assume you have a User model
const scoreTemplate = require("./template");

const transporter = nodemailer.createTransport({
  service: "Gmail", // Use your email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendScoreEmail = async (userId, score, testName) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    const mailOptions = {
      from: `Exam Studio <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Your Test Score",
      html: scoreTemplate({ name: user.name, score, testName }),
    };

    await transporter.sendMail(mailOptions);
    console.log(`Score email sent to ${user.email}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendScoreEmail;
