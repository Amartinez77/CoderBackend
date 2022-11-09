import express from "express";

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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.set("views", "./views");
app.set("view engine", "pug");

// app.get("/datos", (req, res) => {
//   res.render("nivel", req.query);
// });

app.get("/", (req, res) => {
  res.render("formulario.pug")
})

app.get("/hello", (req, res) => {
  res.render("hello.pug", { mensaje: "hola" })
})

app.get("/productos", (req, res) => {
  res.render("productos.pug", { productos })
  console.log(productos)
})

app.post("/productos", (req, res) => {
  productos.push(req.body);
  console.log(productos);
  res.redirect("/")
})



/* ------------------------------------------------------ */
/* Server Listen */
const PORT = 8000;
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
