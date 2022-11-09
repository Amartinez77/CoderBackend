const express = require('express');
const { Server: HttpServer } = require("http");

const { Server: IOServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const messages = [
  { author: "pepe", text: "hola que tal?" },
  { author: "jose", text: "todo bien vos?" },
  { author: "pepe", text: "bien..." },
];

app.use(express.static('public'))

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado!");

  /* Envio los mensajes al cliente que se conectó */
  socket.emit("messages", messages);

  /* Escucho los mensajes enviado por el cliente y se los propago a todos */
  socket.on("mensaje", (data) => {
    messages.push(data);
    io.emit("messages", messages);
  });

});


const PORT = 8080;
const connectedServer = httpServer.listen(PORT, function () {
  console.log(
    `Servidor Http con Websockets escuchando en el puerto ${
      connectedServer.address().port
    }`
  );
});
connectedServer.on("error", (error) =>
  console.log(`Error en servidor ${error}`)
);