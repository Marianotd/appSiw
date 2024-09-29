import { createTransport } from "nodemailer";
import configEnv from "./env.js";

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: configEnv.user_mail,
    pass: configEnv.user_pass,
  },
});

export const sendMail = async (to, subject, text, html) => {
  const options = {
    from: configEnv.user_mail,
    to,
    subject,
    text,
    html
  }

  try {
    await transporter.sendMail(options)
    return `Correo enviado a ${to}`
  } catch (error) {
    console.error('Error al envíar correo de recuperación: ', error)
    return error
  }
}
