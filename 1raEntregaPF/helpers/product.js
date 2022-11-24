const { json } = require("express");
const fs = require("fs");
const path = require("path");

class Product {
  static file = path.join(__dirname, "products.txt");

  static async getAll() {
    try {
      if (fs.existsSync(Product.file)) {
        const json = await fs.promises.readFile(Product.file, "utf-8");
        const data = JSON.parse(json);
        return data;
      } else {
        await fs.promises.writeFile(Product.file, "[]", "utf-8");
        console.log({ Msg: "archivo creado" });
        return [];
      }
    } catch (error) {
      console.log("error");
    }
  }

  static async getById(nro) {
    try {
      if (fs.existsSync(Product.file)) {
        const result = await fs.promises.readFile(Product.file, "utf-8");
        let data = JSON.parse(result);
        const found = data.find((element) => element.id == nro);

        if (found == undefined) {
          //return (undefined)
        throw("no se encuentra elemento")
          
        } else {
          //console.log(found)
          return found;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async update(id, data) {
    const obj = await this.getById(id);
    const objCompleto = await this.getAll();
    console.log("estos son los datos: " + data);
    //const rr = JSON.parse(data);
    console.log("holaaaaaaaaa" + data);
    console.log(obj);
    if (obj == undefined) {
      return {
        status: "error",
        descripcion: `El item con id ${id} no se encuentra dentro del catálogo`,
      };
    } else {
      try {
        if (objCompleto.length > 0) {
          objCompleto.filter((element) => {
            if (element.id == id) {
              element.name = data.name;
              element.price = data.precio;
              element.desc = data.desc;
              element.codigo = data.cod;
              element.url = data.url;
              element.stock = data.url;
              //console.log(element)
            }
          });
        }

        console.log(objCompleto);
        await fs.promises.writeFile(
          Product.file,
          JSON.stringify(objCompleto, null, 2),
          "utf-8"
        );
      } catch (error) {
        console.log(error);
      }
    }
  }

  static async delete(id) {
    console.log(id);
    let obj = await this.getById(id);
    console.log(obj)
    if (obj != undefined) {
      console.log("exite");
      try {
        let objCompleto = await this.getAll();
        if (objCompleto.length > 0) {
          //const nuevoObj = objCompleto.filter((element) => { element.id !== id });

          objCompleto = objCompleto.filter((it) => it.id != id);
          console.log(objCompleto);
          await fs.promises.writeFile(
            Product.file,
            JSON.stringify(objCompleto, null, 2),
            "utf-8"
          );
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("no existe id en el catalogo");
      return {
        status: "error",
        descripcion: `El item con id ${id} no se encuentra dentro del catálogo`,
      };
    }
  }

  constructor(name, price, desc, codigo, url, stock) {
    this.name = name;
    this.price = price;
    this.desc = desc;
    this.codigo = codigo;
    this.url = url;
    this.stock = stock;
    this.timestamp;
    this.id;
  }

  static async leer() {
    try {
      const result = await fs.promises.readFile(Product.file, "utf-8");
      const objeto = JSON.parse(result);
      console.log(objeto);
      return objeto;
    } catch (error) {
      console.log(error);
    }
  }

  async save() {
    try {
      const data = await Product.getAll();
      this.id = data.length + 1;
      this.timestamp = Date.now();
      data.push(this);
      await fs.promises.writeFile(
        Product.file,
        JSON.stringify(data, null, 2),
        "utf-8"
      );
    } catch (error) {
      console.log(error);
    }
  }
}

// async function main() {
//   const n1 = new Product('coca', 150)
//   await n1.save();
//   console.log(await Product.getAll())
// }

// main();

module.exports = Product;
