//import "../config/db.js";
const { productosModel } = require("../models/products");
const logger = require("../utils/logger");

class ProductoDao {
  ID_FIELD = "_id";

  static async exists(id) {
    try {
      console.log(id)
      return await productosModel.findById(id);
    } catch (error) {
      logger.error(error);
    }
  }

  async getAll() {
    try {
      return await productosModel.find();
    } catch (error) {
      logger.error(error);
      return false;
    }
  }

  async getProductById(objectId) {
    try {
      const product = await productosModel.findOne({
        [this.ID_FIELD]: objectId,
      });
      return product;
    } catch (error) {
      logger.error(error);
      return false;
    }
  }

  async createProduct(object) {
    try {
      return await productosModel.create(object);
    } catch (error) {
      logger.error(error);
      return false;
    }
  }

  async updateProductById(id, object) {
    try {
      await productosModel.findByIdAndUpdate(
        {
          [this.ID_FIELD]: id,
        },
        object,
        {
          runValidators: true,
        }
      );
      return true;
    } catch (error) {
      logger.error(error);
      return false;
    }
  }

  async deleteProductById(id) {
    try {
      return await productosModel.findByIdAndDelete({ [this.ID_FIELD]: id });
    } catch (error) {
      logger.error(error);
      return false;
    }
  }
}

module.exports=ProductoDao