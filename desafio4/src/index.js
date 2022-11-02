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

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.send(index.html);
});

routerProductos.get("/productos", (req, res) => {
  res.send(productos);
});

routerProductos.get("/productos/:id", (req, res) => {
  console.log(req.params.id);
  const { id } = req.params;
  console.log(id);
  console.log(productos.length);
  if (id > productos.length) {
    res.json({ error: "id inexistente" });
  } else {
    let encontrado = productos.find((item) => item.id == id);
    console.log(encontrado);
    res.json(encontrado);
  }
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

routerProductos.put("/productos/:id", (req, res) => {
  const { id } = req.params;
  const { title, price, thumbnail } = req.body;
  if (title && price && thumbnail) {
    productos.forEach(function (producto) {
      if (producto.id == id) {
        producto.title = title;
        producto.price = price;
        producto.thumbnail = thumbnail;
      }
    });
    res.json(productos);
  }
});

routerProductos.delete("/productos/:id", (req, res) => {
  console.log(req.params.id);
  if (req.params.id > productos.length) {
    res.json({ error: "id inexistente" });
  } else {
    const filtrado = productos.filter((item) => item.id != req.params.id);
    console.log(filtrado);
    productos = filtrado;
    res.send("producto eliminado");
  }
});

app.use("/api", routerProductos);

app
  .listen(8000, () => {
    console.log("Server running");
  })
  .on("error", () => {
    console.log("Ha ocurrido un error");
  });
