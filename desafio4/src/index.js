const express = require("express");
const { Router } = express;
const path = require("path");

const app = express();
const routerProductos = Router();

let productos = [
  {
    id: 1,
    title: "Gaseosa Coca-cola",
    price: 100,
    thumbnail: "https://danor.com.ar/wp-content/uploads/25007.jpg",
  },
  {
    id: 2,
    title: "Gaseosa Sprite",
    price: 100,
    thumbnail:
      "https://arikiosco.tiendalite.com/images/products/500/55766449-866.jpg",
  },
  {
    id: 3,
    title: "Speed",
    price: 150,
    thumbnail:
      "https://http2.mlstatic.com/D_NQ_NP_791832-MLA31356460677_072019-O.jpg",
  },
];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send(productos);
});

routerProductos.get("/productos", (req, res) => {
  res.send(productos);
});

routerProductos.get("/productos/id", (req, res) => {
  res.json(productos.id);
});

routerProductos.post("/productos", (req, res) => {
  const { title, price, thumbnail } = req.body;

  if (title && price && thumbnail) {
    const id = productos.length + 1;
    const nuevoProduct = { ...req.body, id };
    productos.push(nuevoProduct);
    res.json(productos);
  } else {
    res.json({ error: "faltan datos" });
  }
});

routerProductos.put("/productos/id", (req, res) => {
  res.json(productos.id);
});

routerProductos.delete("/productos/:id", (req, res) => {
  console.log(req.params)
  res.send('producto eliminado')
});

app.use("/api", routerProductos);

app
  .listen(8000, () => {
    console.log("Server running");
  })
  .on("error", () => {
    console.log("Ha ocurrido un error");
  });
