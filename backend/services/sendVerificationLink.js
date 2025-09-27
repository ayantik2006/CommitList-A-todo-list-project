const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDER_MAIL = process.env.SENDER_MAIL;

sgMail.setApiKey(SENDGRID_API_KEY);

exports.sendVerificationLink = async (to, id) => {
  const msg = {
    to: to,
    from: SENDER_MAIL, // verified sender email in SendGrid
    subject: "Welcome to CommitList!",
    html: `
      <h2 style="color: #4CAF50;">Welcome 🎉</h2>
      <p>Thanks for signing up! Please click the button below to verify your email:</p>
      <p style="color:#fa1946"><b>This link is valid only for 10 minutes.</b></p>
      <a href="https://commitlist-backend.onrender.com/auth/${id}" 
         style="display:inline-block; padding:10px 15px; background:#4CAF50; color:white; border-radius:5px; text-decoration:none;">
         Verify Email
      </a>
      <p style="font-size:12px; color:#555;">If you didn't request this, you can ignore this email.</p>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log("Verification email sent successfully!");
  } catch (err) {
    console.error("Error sending email via SendGrid:", err);
  }
};
