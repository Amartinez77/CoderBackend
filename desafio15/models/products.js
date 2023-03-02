const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  
  name: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: Number, required: true, unique: true },
  pic: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number}

});

const productosModel = mongoose.model("products", productSchema);
module.exports = {
  productosModel,
  productSchema,
};
