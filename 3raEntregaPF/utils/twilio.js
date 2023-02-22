//const twilio = require("twilio");
const { TWILIO_SID, TWILIO_TOKEN, ADMIN_NUMBER } = require("../config");
const logger = require("../utils/logger");

const client = require("twilio")(TWILIO_SID, TWILIO_TOKEN)

const SMS = async (user) => {
  try {
    const message = await client.messages.create({
      body: "Gracias por confiar coder Ecommerce! Ya puede abonar su producto.",
      from: "+12708177642",
      to: `+543884455788`,
    });
    // console.log(message)
  } catch (error) {
    logger.error(`Error al enviar sms al usuario ${error}`);
  }
};

// const WHS = async (order) => {
//   try {
//     const cart = order.cart;
//     const products = cart.products.map(({ name, price }) => {
//       return `\n item: ${name} \n precio: ${price}`;
//     });
//     const message = await client.messages.create({
//       from: "whatsapp:+14155238886",
//       body: `Nueva orden registrada \n Datos de usuario: \n id: ${
//         order.user._id
//       } \n nombre: ${order.user.username} \n order: ${
//         order.user.mail
//       } \n order: ${order.user.age} \n Productos: \n ${products.join("\n")}`,
//       to: `whatsapp:${ADMIN_NUMBER}`,
//     });
//     console.log(message.sid);
//   } catch (error) {
//     logger.error(`Error al enviar whatsapp de la orden ${error}`);
//   }
// };

module.exports =  SMS ;
