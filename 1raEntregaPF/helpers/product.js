const fs = require('fs');
const path = require('path');

class Product {

  static file = path.join(__dirname, 'products.txt');

  static async getAll() {
    try {
      if ( fs.existsSync(Product.file) ) {
        const json = await fs.promises.readFile(Product.file, "utf-8");
        const data = JSON.parse(json);
        return data

      } else {
        await fs.promises.writeFile(Product.file, "[]", 'utf-8');
        console.log({ Msg: "archivo creado" });
        return []
      }
    } catch (error) {
      console.log('error');
    }
  };

  static async getById(nro) {

    try {
      
      if (fs.existsSync(Product.file)) {
        
        const result = await fs.promises.readFile(Product.file, 'utf-8');
        let data = JSON.parse(result);
        const found = data.find((element) => element.id == nro )

        if (found == undefined) {
          throw "no existe el elemento buscado";
        } else {
          //console.log(found)
          return found;
        }
      }

    } catch (error) {
      console.log(error)
    }

  }

  constructor(name, price) {
    this.name = name;
    this.price = price;
    this.id;
      
  };

  async save() {
    try {
      const data = await Product.getAll();
      this.id = data.length + 1;
      data.push(this);
      await fs.promises.writeFile(Product.file, JSON.stringify(data, null, 2), 'utf-8')
    } catch (error) {
      console.log(error)
    }
  }



};


// async function main() {
//   const n1 = new Product('coca', 150)
//   await n1.save();
//   console.log(await Product.getAll())
// }

// main();

module.exports = Product;
