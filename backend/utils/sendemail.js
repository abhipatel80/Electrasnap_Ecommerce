require('dotenv').config();
const nodemailer = require('nodemailer');

const sendemail = async ({ email, subject, message }) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
        const mailoptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: subject,
            text: message
        };
        await transporter.sendMail(mailoptions)
    } catch (e) {
        console.log(e);
    }
}

module.exports = sendemail;
