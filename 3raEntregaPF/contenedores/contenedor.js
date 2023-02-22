const productosModel = require("../models/products")
const logger = require("../utils/logger")


class Contenedor {
  ID_FIELD = "_id";
  // constructor() {
  //   this.productos = [];
  // }

  static exists(id) {
    try {
      return productosModel.findById(id);
    } catch (error) {
      logger.error(error);
    }
  }

  getAll() {
    try {
      return productosModel.find();
    } catch (error) {
      logger.error(error);
    }
  }

  getById(objectId) {
    try {
      const product = productosModel.findOne({
        [this.ID_FIELD]: objectId,
      });
      return product;
    } catch (error) {
      logger.error(error);
      return false;
    }
  }

  createProduct(object) {
    try {
      return productosModel.create(object);
    } catch (error) {
      logger.error(error);
      return false;
    }
  }
  // save(obj) {
  //   this.productos.push(obj);
  //   return obj;
  // }

  // deleteAll() {
  //   this.productos = [];
  // }

  // deleteById(id) {
  //   const index = this.productos.findIndex((elem) => elem.id == id);
  //   if (index == -1) {
  //     throw new Error(`Error al borrar: elemento no encontrado`);
  //   } else {
  //     return this.productos.splice(index, 1);
  //   }
  // }

  deleteProductById(id) {
    try {
      return productosModel.findByIdAndDelete({ [this.ID_FIELD]: id });
    } catch (error) {
      logger.error(error);
      return false;
    }
  }

  // update(elem) {
  //   elem.id = +elem.id;
  //   const index = this.productos.findIndex((p) => p.id == elem.id);
  //   if (index == -1) {
  //     throw new Error(`Error al actualizar: elemento no encontrado`);
  //   } else {
  //     this.elementos[index] = elem;
  //     return elem;
  //   }
  // }

  updateProductById(id, object) {
    try {
      productosModel.findByIdAndUpdate(
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
}

module.exports = Contenedor;
