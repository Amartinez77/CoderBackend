const { Router } = require("express");
const Cart = require("../helpers/cart")
const routerCarts = Router();

//Add a cart
routerCarts.post("/", async (req, res) => {
  const products = req.body;
  console.log(products)
  // if (!products) return await Cart.save([]);
  // Cart.save(products);
  // res.json({ message: "Carrito agregado" });
});



module.exports= routerCarts;
