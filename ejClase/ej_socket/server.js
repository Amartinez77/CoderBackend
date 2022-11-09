const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io')

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static('./public'));

app.get('/', (req, res) => {
  res.sendFile('index.html', {root: __dirname})
})

io.on('connection', (socket) => {
  console.log('usuario conectado')

  socket.on('mensaje'.data => {
    io.emit('mensajes', data)
  })
})

const PORT = 8080;
const connectedServer = httpServer.listen(PORT, () => {
  console.log(
    `Servidor Http con Websockets escuchando en el puerto ${connectedServer.address().port}`
  );
});
connectedServer.on("error", (error) =>
  console.log(`Error en servidor ${error}`)
);

