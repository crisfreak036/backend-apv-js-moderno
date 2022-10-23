import nodemailer from 'nodemailer';

const emailRegistro = async (datos) => {
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
        subject: "Comprueba tu cuenta en APV",
        text: `Hola ${nombre},\n Comprueba tu cuenta en APV utilizando el siguiente enlace: \n ${process.env.FRONTEND_URL}/confirmar-cuenta/${token} \nSi tu no creaste esta cuenta, puedes ignorar este mensaje`,
        html: `<p>Hola ${nombre},<p/>
                <p>Comprueba tu cuenta en APV utilizando el siguiente enlace:
                <a href="${process.env.FRONTEND_URL}/confirmar-cuenta/${token}">Comprobar Cuenta<a/><p/>
                <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje<p/>`
    });

    console.log("Mensaje enviado: %s", info.messageId)
}

export default emailRegistro;