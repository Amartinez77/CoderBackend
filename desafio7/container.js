const knex = require("knex");

class Container {
  constructor(config, tableName) {
    this.config = config;
    this.tableName = tableName;
    this.knex = knex(this.config);
  }

  save = (obj) => {
    this.knex(this.tableName)
      .insert(obj)
      .then(() => console.log("objeto guardado"))
      .catch((err) => {
        console.log(err);
        throw err;
      })
      .finally(() => this.knex.destroy());
  };

  getById = async (id) => {
    try {
      let obj = await this.knex
        .from(this.tableName)
        .select()
        .table(this.tableName)
        .where("id", id)
        .first();
      if (obj) {
        return obj;
      } else {
        return { message: "ERROR" };
      }
    } catch (error) {
      return { message: "ERROR" };
    }
  };

  getAll = async () => {
    try {
      let obj2 = await this.knex.from(this.tableName).select("*");
      return obj2;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  deleteById = async (id) => {
    try {
      this.knex.from(this.tableName).where("id", "=", id).del();
      return { message: "objeto eliminado" };
    } catch (error) {
      return { message: "ERROR" };
    }
  };

  deleteAll = async () => {
    try {
      this.knex.from(this.tableName).del();
      return { message: "tabla eliminada" };
    } catch (err) {
      return { message: "ERROR" };
    }
  };

  update = async (obj) => {
    try {
      this.knex.from(this.tableName).update(obj).update();
      return { message: "objeto agregado" };
    } catch (error) {
      return { message: "ERROR" };
    }
  };
}

module.exports = Container;
