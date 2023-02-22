// import mongoose from "mongoose";
const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
  ],
});

const CarritosModel = mongoose.model("carritos", Schema);

module.exports = CarritosModel