const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const { engine } = require("express-handlebars");
const fs = require("fs");
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);



let productos = [
  {
    nombre: "pizza",
    precio: 550,
    url: "https://www.svgrepo.com/show/29781/pizza.svg",
  },
  {
    nombre: "hamburguesa",
    precio: 800,
    url: "https://www.svgrepo.com/show/67647/hamburger.svg",
  },
  {
    nombre: "gaseosa",
    precio: 600,
    url: "https://www.svgrepo.com/show/11280/soda.svg",
  },
];

app.engine(
  "handlebars",
  engine({
    defaultLayout: "index.handlebars",
    extname: ".handlebars",
  })
);

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "handlebars");

app.set("views", "./views");

//app.use(express.json());

app.get("/", (req, res) => {
  res.render("formulario", { productos });
  // res.render("productos", {productos})
});

  


app.use(express.static("views"));



io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado!");
  //socket.emit("messages", messages);




  fs.promises.readFile("./chat.txt", "utf-8")
    .then((data) => {
      console.log(data)
      io.sockets.emit("messages", JSON.parse(data));
  });

  //io.sockets.emit("productos", productos);

    socket.emit("productos", productos);

  socket.on("newProducto", (producto) => {
    productos.push(producto);
    console.log(producto)
    io.sockets.emit("productos", productos);
    //io.emit("newProductos", productos)
  });


socket.on("newMessage", async (newMessage) => {
  let data = await fs.promises.readFile("./chat.txt", "utf-8");
  let messages = JSON.parse(data);
  messages.push(newMessage);
  fs.writeFileSync("./chat.txt", JSON.stringify(messages));
  io.sockets.emit("messages", messages);
});

  // socket.on("new-message", (data) => {
  //   messages.push(data);
  //   io.sockets.emit("messages", messages);
  // });
});

const PORT = 8080;
const connectedServer = httpServer.listen(PORT, () => {
  console.log(
    `Servidor Http con Websockets escuchando en el puerto ${
      connectedServer.address().port
    }`
  );
});
connectedServer.on("error", (error) =>
  console.log(`Error en servidor ${error}`)
);
