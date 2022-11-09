import express from "express";
import fs from "fs";
// const exphbs = require("express-handlebars");
import { engine } from "express-handlebars";

const app = express();

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

// const handlebarsConfig = {
//   // extname: 'hbs',
//   // defaultLayout: 'index.hbs'
//   defaultLayout: "index.handlebars",
// };
//engine()

//, layoutsDir: '/views/layouts'

app.engine("handlebars", engine({ defaultLayout: "index.handlebars", extname: '.handlebars'  }));

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "handlebars");

app.set("views", "../views");

//app.use(express.json());

app.get("/", (req, res) => {
  res.render('formulario')
});

app.get('/productos', (req, res) => {

  res.render("datos", { productos });
  console.log(productos)
  
  //res.render("datos", { productos })
})

app.post("/productos", (req, res) => {
  productos.push(req.body);
  console.log(productos);
  res.redirect("/");
});



app.listen(8000, () => {
  console.log("Servidor ok, puerto 8000");
});
