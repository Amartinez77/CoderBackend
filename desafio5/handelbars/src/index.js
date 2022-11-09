import express from "express";
import fs from "fs";
// const exphbs = require("express-handlebars");
import { engine } from "express-handlebars";

const app = express();

let productos = [
  {
    nombre: 'pepe',
    precio: 55,
    url:'www.google.com'
}
];

// const handlebarsConfig = {
//   // extname: 'hbs',
//   // defaultLayout: 'index.hbs'
//   defaultLayout: "index.handlebars",
// };
//engine()
app.engine("handlebars", engine({ defaultLayout: "index.handlebars" }));

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "handlebars");

app.set("views", "../views");

app.get("/", (req, res) => {
  res.render('formulario')
});

app.get('/productos', (req, res) => {

  res.render("datos", { productos: JSON.stringify(productos) });
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
