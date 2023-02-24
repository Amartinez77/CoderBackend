import { createTransport } from "nodemailer";
import logger from "../../loggers/Log4jsLogger.js";

//import { GMAILACCOUNT, GMAILPASSWORD } from "../../../configs/db.config.js";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

const transporter = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.GMAIL_ACCOUNT,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const gmailOptions = (emailSubject, htmlTemplate) => {
  return {
    from: process.envGMAIL_ACCOUNT,
    to: process.env.GMAIL_ACCOUNT,
    subject: emailSubject,
    html: htmlTemplate,
  };
};

const htmlNewUserTemplate = (id, date) => {
  return `
    <h2>¡Nuevo usuario Creado!</h2>
    <p>Se ha creado un nuevo usuario a través de la API</p>
    <ul>
        <li><strong>UUID:</strong> ${id}</li>
        <li><strong>FECHA:</strong> ${date}</li>
    </ul>
    `;
};

export async function sendGmail(subject, htmlTemplate) {
  try {
    const mailOptions = gmailOptions(subject, htmlTemplate);

    await transporter.sendMail(mailOptions);
    logger.info(`Email sent`);
  } catch (error) {
    logger.error(error);
  }
}
