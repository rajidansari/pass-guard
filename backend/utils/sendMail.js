const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: `${process.env.MAILTRAP_HOST}`,
    port: process.env.MAILTRAP_PORT,
    auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD,
    },
});

const sendResetMail = async (email, otp) => {
    const info = await transporter.sendMail({
        from: '"PassGuard Dev" <no-reply@passguard.dev>',
        to: email,
        subject: "Passguard - OTP For Password Reset",
        html: `
      <h2>Use this otp to reset your password</h2>
      <p>Your OTP is:</p>
      <h4>${otp}</h4>
    `,
    });
};

module.exports = { sendResetMail }