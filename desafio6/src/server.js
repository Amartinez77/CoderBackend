const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const { engine } = require("express-handlebars");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const messages = [
  {
    author: "Juan",
    text: "hola que tal?",
  },
  {
    author: "Pedro",
    text: "muy bien, vos?",
  },
];

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
    extname: ".handlebars"
  })
);

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "handlebars");

app.set("views", "./views");

//app.use(express.json());

app.get("/", (req, res) => {
  res.render("formulario");
});

app.get("/productos", (req, res) => {
  res.render("datos", { productos });
  console.log(productos);

  //res.render("datos", { productos })
});

app.post("/productos", (req, res) => {
  productos.push(req.body);
  console.log(productos);
  res.redirect("/");
});

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado!");
  socket.emit("messages", messages);

  socket.on("new-message", (data) => {
    messages.push(data);
    io.sockets.emit("messages", messages);
  });
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
