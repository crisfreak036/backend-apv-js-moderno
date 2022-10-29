import nodemailer from 'nodemailer';

const emailOlvidePassword = async (datos) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST_DEV,
    port: process.env.SMTP_PORT_DEV,
    auth: {
      user: process.env.SMTP_USER_DEV,
      pass: process.env.SMTP_PASS_DEV
    }
});

const { email, nombre, token } = datos;

const info = await transporter.sendMail({
    from: "APV - Administrador de Pacientes de Veterinaria",
    to: email,
    subject: "Reestablece tu Password",
    text: `Hola ${nombre},\nHas solicitado Reetablecer tu Password.\nEntra al siguiente enlace para crear una nueva Password:
    ${process.env.FRONTEND_URL}/olvide-password/${token}\nSi tu no creaste esta cuenta, puedes ignorar este mensaje`,
    html: `<p>Hola ${nombre},<p/>
            <p>Has solicitado Reetablecer tu Password. Entra al siguiente enlace para crear una nueva Password:
            <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Password<a/><p/>
            <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje<p/>`
});

console.log("Mensaje enviado: %s", info.messageId)
}

export default emailOlvidePassword;