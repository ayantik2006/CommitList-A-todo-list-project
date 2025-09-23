const nodemailer = require("nodemailer");
const SENDER_MAIL=process.env.SENDER_MAIL;
const APP_PASS=process.env.APP_PASS;

exports.sendVerificationLink = async (to, id) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: SENDER_MAIL,
      pass: APP_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: SENDER_MAIL,
      to: to,
      subject: "Welcome to CommitList!",
      html: `
        <h2 style="color: #4CAF50;">Welcome 🎉</h2>
        <p>Thanks for signing up! Please click the button below to verify your email:</p>
        <p style="color:#fa1946"><b>This link is valid only for 10 minutes.</b></p>
        <a href="http://localhost:8080/auth/${id}" 
           style="display:inline-block; padding:10px 15px; background:#4CAF50; color:white; border-radius:5px; text-decoration:none;">
           Verify Email
        </a>
        <p style="font-size:12px; color:#555;">If you didn't request this, you can ignore this email.</p>
      `,
    });
  } catch (err) {
    console.error("Error sending email:", err);
  }
};
