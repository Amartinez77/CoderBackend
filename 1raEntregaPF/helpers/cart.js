const fs = require("fs");
const path = require("path");


class Cart {
  static file = path.join(__dirname, "carrito.txt");

  static async getAll() {
    try {
      if (fs.existsSync(Cart.file)) {
        const json = await fs.promises.readFile(Cart.file, "utf-8");
        const data = JSON.parse(json);
        return data;
      } else {
        await fs.promises.writeFile(Cart.file, "[]", "utf-8");
        console.log({ Msg: "archivo creado" });
        return [];
      }
    } catch (error) {
      console.log("error");
    }
  }

  async save(obj) {
    // try {
    //   const data = await Cart.getAll();
    //   this.id = data.length + 1;
    //   this.timestamp = Date.now();
    //   data.push(this);
    //   await fs.promises.writeFile(
    //     Cart.file,
    //     JSON.stringify(data, null, 2),
    //     "utf-8"
    //   );
    // } catch (error) {
    //   console.log(error);
    // }
    try {
      obj.id = await this.generateId();
      obj.timestamp = Date.now();
      this.objects.push(obj);
      this.writeData();
      return obj.id;
    } catch (err) {
      console.log(err);
    }
  }

  static async leer() {
    try {
      const result = await fs.promises.readFile(Cart.file, "utf-8");
      const objeto = JSON.parse(result);
      console.log(objeto);
      return objeto;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async writeData() {
    await fs.promises.writeFile(
      Cart.file,
      JSON.stringify(this.objects, null, 2)
    );
  }

  //Genera ID
  generateId() {
    try {
      if (this.objects.length === 0) return 1;
      return this.objects[this.objects.length - 1].id + 1;
    } catch (err) {
      console.log(err);
    }
  }

  constructor(fileName) {
    this.fileName = Cart.file;
    this.objects = this.leer();
  }
}



module.exports = Cart;