const { ADMIN_MAIL, ADMIN_PASS } = require("../config");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const logger = require("../utils/logger");

// const signup = async (user) => {

const sendGmail = async  (user)=> {
  
  //console.log(user)
  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: ADMIN_MAIL,
      pass: ADMIN_PASS,
    },
  });

  let Mailgenerator = new Mailgen({
    theme: "default",
    product: {
      name: "ecommerce coder",
      link: "http://localhost:8080/",
    },
  });

  let response = {
    body: {
      intro: "El usuario registrado es:",
      table: {
        data: [
          {
            //id: user._id.toString(),
            id: user.id,
            username: user.username,
            // mail: user.mail,
            // age: user.age,
          },
        ],
      },
      outro: "Usuario agregado en la base de datos con éxito",
    },
  };

  let mail = Mailgenerator.generate(response);
  const message = {
    from: ADMIN_MAIL,
    to: ADMIN_MAIL,
    subject: "Nuevo Registro",
    html: mail,
  };

  try {
    const info = await transporter.sendMail(message);
    // res.status(201).json({ message: "Getbill successfully... " });
    return {
      message: "Email sent successfully... ",
      preview: nodemailer.getTestMessageUrl(info),
    };
  } catch (error) {
    logger.error(`Error al enviar mail de nuevo registro ${error}`);
  }
};

// module.exports = {
//   signup
  
// };

module.exports = sendGmail;