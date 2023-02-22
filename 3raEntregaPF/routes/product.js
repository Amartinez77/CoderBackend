const { Router } = require("express");
//import { ProductoDao } from "../dao/ProductoDao.js";
const ProductoDao = require("../dao/ProductoDao")
//import { authMiddleware } from "../middlewares/Auth.js";
const router = Router();
const productoDao = new ProductoDao();
//import logger from "../loggers/Log4jsLogger.js";

// GET api/productos

router.get("/", async (req, res) => {
  const products = await productoDao.getAll();
 // let productos= JSON.stringify(products)
  products
    ? (res.render("datos", { products } ),
      console.log(products))
    : res
        .status(400)
        .json({ error: "there was a problem when trying to get the products" });
});


  router.get("/productos-test", async (req, res, next) => {
    try {
      const arrayDeProductos = await apiProductos.getAll();
      if (arrayDeProductos.length === 0) {
        throw new Error("No hay productos");
      }

      let prueba = [
        {
          id: 01,
          title: "pepe",
        },
      ];

      let arrayProd = await getProducts;
      console.log(arrayProd);


      res.render("datos", { prueba });

    } catch (err) {
      next(err);
    }
  });


// GET api/productos/:id

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await productoDao.getProductById(id);

  product
    ? (res.render("datos", { product }),
        console.log(product))
    : res.status(400).json({ error: "product not found" });
});

// POST api/productos
router.post("/",  async (req, res) => {
  const { body } = req;
  const newProduct = await productoDao.createProduct(body);

  newProduct
    ? res
        .status(200)
        .json({ success: "Product added with ID " + newProduct._id })
    : res.status(400).json({
        error:
          "there was an error, please verify the body content match the schema",
      });
});

// PUT api/productos/:id
router.put("/:id",  async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const wasUpdated = await productoDao.updateProductById(id, body);

  wasUpdated
    ? res.status(200).json({ success: "product updated" })
    : res
        .status(404)
        .json({ error: "product not found or invalid body content." });
});

// DELETE /api/productos/id

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const wasDeleted = await productoDao.deleteProductById(id);

  wasDeleted
    ? res.status(200).json({ success: "product successfully removed" })
    : res.status(404).json({ error: "product not found" });
});

module.exports= router;
