require('dotenv').config()
const express = require("express");
const { mongoose } = require("mongoose");
const routerProducts = require("./routes/routerProducts.js");
const routerCarts = require("./routes/routerCarts.js");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", routerProducts);
app.use("/api/cart", routerCarts);
app.use("*", (req, res) => {
  const path = req.params;
  const method = req.method;
  res.send({
    error: -2,
    descripcion: `ruta '${path[0]}' método '${method}' no implementada`,
  });
});






const server = app.listen(PORT, async () => {
  
  console.log(`Server running on PORT ${PORT}`);
  
  //comentar mongoose para usar Firebase, ademas comentar en controllerProducts.js - Products 
  mongoose.set("strictQuery", false)
  mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.crzm5b3.mongodb.net/baseTest`,
  {
    serverSelectionTimeoutMS: 5000,
    }
  
  
);
console.log("Base de datos conectada");
});

server.on("error", (err) => console.log(err));
