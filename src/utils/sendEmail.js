const nodemailer = require("nodemailer");
const dotenv = require('dotenv');

dotenv.config();

const sendEmail = async (to, subject, message, next) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", 
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: message, 
      html: `<p>${message}</p>`, 
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent to:", to);
  } catch (error) {
    next(error);
  }
};

module.exports = { sendEmail };