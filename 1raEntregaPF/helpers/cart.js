const fs = require("fs");
const path = require("path");

class Cart {
  static file = path.join(__dirname, "carrito.txt");

  static async obtenerTodos() {
    // const fileContent = await fs.promises.readFile(Cart.file,    "utf-8"
    // );

    if (fs.existsSync(Cart.file, "utf-8")) {
      console.log("si existe");
      const json = await fs.promises.readFile(Cart.file, "utf-8");
      const data = JSON.parse(json);
      return data;
    } else {
      console.log("no existe");
      await fs.promises.writeFile(Cart.file, "[]", "utf-8");
      console.log({ Msg: "archivo creado" });
      return [];
    }

    //console.log(fileContent)

    //return fileContent;
  }

  static async getById() {
    if (fs.existsSync(Cart.file)) {
      const result = await fs.promises.readFile(Cart.file, "utf-8");
      let data = JSON.parse(result);
      const found = data.find((element) => element.id == nro);

      if (found == undefined) {
        //return (undefined)
        throw "no se encuentra elemento";
      } else {
        //console.log(found)
        return found;
      }
    }
  }

  static async save(obj, prod) {
    obj.push(prod);
    obj[obj.length - 1].id = obj.length;
    //console.log(data)
    await fs.promises.writeFile(
      Cart.file,
      JSON.stringify(obj, null, 2),
      "utf-8"
    );

    return obj[obj.length - 1].id;
  }

  constructor() {
    this.id;
    this.productos;
  }
}

module.exports = Cart;
