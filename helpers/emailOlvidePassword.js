import nodemailer from 'nodemailer';

const emailOlvidePassword = () => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST_DEV,
        port: process.env.SMTP_PORT_DEV,
        auth: {
          user: process.env.SMTP_USER_DEV,
          pass: process.env.SMTP_PASS_DEV
        }
      });
}

export default emailOlvidePassword;