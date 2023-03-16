import express from "express";
import auth from "../middlewares/auth.middleware.js";
import * as productController from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", productController.getAll);
router.get("/:id", productController.getById);

// router.post("/", auth, productController.create);
// router.put("/:id", auth, productController.update);
// router.delete("/:id", auth, productController.remove);

// para poder usar thunderclient en las pruebas se omitio la funcion auth
router.post("/", productController.create);
router.put("/:id", productController.update);
router.delete("/:id", productController.remove);

export default router;
