// desafio Manejo de archivos

const fs = require("fs");

class Contenedor {
  constructor(archivo) {
    this.filename = archivo;
  }

  save = async (producto) => {
    try {
      if (fs.existsSync(this.filename)) {
        let result = await this.getAll();
        //[{id:1},{id:2},{id:3}]
        //[]
        let lastId = result.reduce(
          (acc, item) => (item.id > acc ? (acc = item.id) : acc),
          0
        );
        let newProduct = {
          id: lastId + 1,
          ...producto,
        };
        result.push(newProduct);

        await fs.promises.writeFile(
          this.filename,
          JSON.stringify(result, null, 2)
        );
        return lastId + 1;
      } else {
        //si el archivo no existe : [{id:1}]
        let newProduct = {
          id: 1,
          ...producto,
        };
        await fs.promises.writeFile(
          this.filename,
          JSON.stringify([newProduct], null, 2)
        );
        return 1;
      }
    } catch (error) {
      console.log(error);
    }
  };
  getAll = async () => {
    try {
      if (fs.existsSync(this.filename)) {
        let result = await fs.promises.readFile(this.filename);
        return JSON.parse(result);
      } else {
        throw "No se encontro el archivo";
      }
    } catch (error) {
      console.log(error);
    }
  };

  getById = async (nro) => {
    try {
      if (fs.existsSync(this.filename)) {
        let result = await fs.promises.readFile(this.filename);
        let data = JSON.parse(result);
        console.log(nro);
        const found = data.find((element) => element.id == nro);
        if (found == undefined) {
          throw "no existe el elemento buscado";
        } else {
          return found;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  deleteById = async (nro) => {
    try {
      if (fs.existsSync(this.filename)) {
        let result = await fs.promises.readFile(this.filename);
        let data = JSON.parse(result);
        console.log(nro);

        const found = data.find((element) => element.id == nro);
        if (found == undefined) {
          throw "no existe el elemento buscado";
        } else {
          const arrayFiltrado = data.filter((item) => item.id !== nro);
          
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
}

let contenedor = new Contenedor("productos.txt");
let producto = {
  brand: "Gaseosa Coca-cola",
  price: 100,
  liquidVol: "353ml",
  imagePath: "https://danor.com.ar/wp-content/uploads/25007.jpg",
};
let producto2 = {
  brand: "Gaseosa Sprite",
  price: 100,
  liquidVol: "310ml",
  imagePath:
    "https://arikiosco.tiendalite.com/images/products/500/55766449-866.jpg",
};
let producto3 = {
  brand: "Speed",
  price: 150,
  liquidVol: "250ml",
  imagePath:
    "https://http2.mlstatic.com/D_NQ_NP_791832-MLA31356460677_072019-O.jpg",
};

metodos = async () => {
  // await contenedor.save(producto);
  // await contenedor.save(producto2);
  // await contenedor.save(producto3);

  console.log(await contenedor.getAll());
  console.log(await contenedor.getById(2));
  console.log(await contenedor.deleteById(5));
};

metodos();
