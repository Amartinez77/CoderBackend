const path = require("path");
const express = require("express");
const { Server: HttpServer } = require("http");
const morgan = require("morgan");
const { engine } = require("express-handlebars");

const notes = require("./routes/notes.routes")
const routerCarts = require("./routes/routerCart")



// variables

const PORT = process.env.PORT || 8080;
const configHbs = {
  extname: 'hbs',
  defaultLayout: 'main.hbs',
  layoutsDir: path.join(__dirname, "views", "layouts")
}


// SERVIDOR

const server = express();
const httpServer = new HttpServer(server);


// SETTINGS

server.engine('hbs', engine(configHbs));
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'hbs');

//MIDDLEWARES

server.use(express.static(path.join(__dirname, "public")));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(morgan('dev'));

// RUTAS

server.use("/api", notes);
server.use("/api/cart", routerCarts);

/* ------------------------------------------------------ */
/* Server Listen */

// const app = server.listen(PORT, () => {
//     console.log(`Servidor escuchando en el puerto ${app.address().port}`)
// })
// app.on('error', error => console.log(`Error en servidor ${error}`))

httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
httpServer.on("error", (err) => {
  console.log({ FatalError: err });
});
