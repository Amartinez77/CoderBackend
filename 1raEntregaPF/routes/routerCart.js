const { Router, query } = require("express");
const Cart = require("../helpers/cart")
const routerCarts = Router();



//Add a cart
routerCarts.post("/", async (req, res) => {
  const products = req.body;
  console.log(products)
  const data = await Cart.obtenerTodos();
  console.log(typeof(data))
  await Cart.save(data, products);

});

//add a specific cart

routerCarts.post('/:id/productos', (req, res) => {

  console.log(req.body)
})



routerCarts.get("/add", (req, res) => {
  // const id = req.params.id
  // console.log(req.params)

  res.render("cargarCarrito");
  
});





module.exports= routerCarts;
