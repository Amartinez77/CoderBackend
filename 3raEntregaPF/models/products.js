const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  
  name: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: Number, required: true, unique: true },
  thumbnail: { type: String, required: true },
  price: { type: Number, required: true },

});

const productModel = mongoose.model("products", productSchema);
module.exports = {
  productModel,
  productSchema,
};
