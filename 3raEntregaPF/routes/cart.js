const { Router, request } = require("express");
const CarritoDao = require("../dao/carritoDao");
//const Contenedor = require("../contenedores/contenedor")
const ProductoDao = require("../dao/ProductoDao");
const cartRouter = Router();
const mongoose = require("mongoose");
const SMS = require("../utils/twilio");
const logger = require("../utils/logger");

const carritoDao = new CarritoDao();

// cartRouter.get("/", (req, res) => {
//   res.send("hola");
// });

// POST /api/carrito
cartRouter.post("/", async (_req, res) => {
  const newCart = await carritoDao.createCart();

  newCart
    ? res.status(200).json({ success: "Product added with ID " + newCart._id })
    : res.status(500).json({ error: "there was an error" });
});

// DELETE /api/carrito/id
cartRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const wasDeleted = await carritoDao.deleteCartById(id);

  wasDeleted
    ? res.status(200).json({ success: "cart successfully removed" })
    : res.status(404).json({ error: "cart not found" });
});

// POST /api/carrito/:id/productos

cartRouter.post("/:id/productos", async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  //console.log(id)
  //console.log(body)
  //const productExists = await Contenedor.exists(body.productId);

  const prueba = mongoose.Types.ObjectId(req.body.productId.trim());
  const productExists = await ProductoDao.exists(prueba);
  console.log("holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  console.log(productExists);

  if (productExists) {
    // let cart ="63f3f7ea3c22d8b2cd3f6992"
    //const id = mongoose.Types.ObjectId(req.params.id.trim());
    const resp = await carritoDao.saveProductToCart(id, prueba);
    resp
      ? res.status(200).json({ success: "producto agregado" })
      : res.status(404).json({ error: "product not found" });
  } else {
    res.status(404).json({ error: "product not found" });
  }
});

// GET /api/carrito/:id/productos
cartRouter.get("/:id/productos", async (req, res) => {
  const { id } = req.params;
  const cartProducts = await carritoDao.getAllProductsFromCart(id);

  cartProducts
    ? res.status(200).json(cartProducts)
    : res.status(404).json({ error: "cart not found" });
});

// DELETE /api/carrito/:id/productos/:id_prod
cartRouter.delete("/:id/productos/:id_prod", async (req, res) => {
  const { id, id_prod } = req.params;

  const wasDeleted = await carritoDao.deleteProductFromCart(id, id_prod);

  wasDeleted
    ? res.status(200).json({ success: "that product is no longer in the cart" })
    : res.status(400).json({ error: "there was some problem" });
});

cartRouter.post("/:id/checkout", async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const cartProducts = await carritoDao.getAllProductsFromCart(id);

    console.log(req.user);
    const user = req.user.username;

    const respSms = await SMS(user);
    res.json({ success: "mensaje enviado con exito!" });
  } catch (error) {
    logger.error(`no se pudo agregar el producto ${error}`);
    res.send({ error: `no se pudo agregar el producto ${error}` });
  }
});

//export default router;

module.exports = cartRouter;
