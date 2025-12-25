// const nodemailer = require("nodemailer");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

// send mails in development

// const transporter = nodemailer.createTransport({
//     host: `${process.env.MAILTRAP_HOST}`,
//     port: process.env.MAILTRAP_PORT,
//     auth: {
//         user: process.env.MAILTRAP_USER,
//         pass: process.env.MAILTRAP_PASSWORD,
//     },
// });

// send mails in production
const sendResetMail = async (email, otp) => {
    try {
        const { data, error } = await resend.emails.send({
            from: "PassGuard <onboarding@resend.dev>",
            to: email,
            subject: "PassGuard - Password Reset Code",
            html: `
        <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 40px;">
          <div style="max-width: 480px; margin: auto; background: #ffffff; border-radius: 10px; padding: 32px; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
            
            <h2 style="color: #111827; margin-bottom: 8px;">Reset your password</h2>
            <p style="color: #4b5563; font-size: 14px;">
              We received a request to reset your PassGuard password.
            </p>

            <div style="margin: 24px 0; text-align: center;">
              <span style="display: inline-block; background: #111827; color: #ffffff; font-size: 28px; letter-spacing: 6px; padding: 14px 24px; border-radius: 8px; font-weight: bold;">
                ${otp}
              </span>
            </div>

            <p style="color: #4b5563; font-size: 14px;">
              This code will expire in <strong>10 minutes</strong>.
            </p>

            <p style="color: #6b7280; font-size: 13px; margin-top: 24px;">
              If you didn’t request this, you can safely ignore this email.
            </p>

            <hr style="margin: 28px 0; border: none; border-top: 1px solid #e5e7eb;" />

            <p style="font-size: 12px; color: #9ca3af; text-align: center;">
              © ${new Date().getFullYear()} PassGuard. All rights reserved.
            </p>
          </div>
        </div>
      `,
        });

        return { data, error };
    } catch (error) {
        console.log("Resend Error :: ", error.message);
    }
};

module.exports = { sendResetMail };
