const { Router } = require("express");
const Product = require("../helpers/product");

const notes = Router();

notes.get('/', async (req, res) => {
  const products = await Product.getAll();
  res.render("products", { products });
});

// GET DE CONSULTA DE PRODUCTOS POR ID O TODOS LOS PRODUCTOS
notes.get('/consulta/:id?', async (req, res) => {
  //let id = req.params.id;
  let id = req.query.number;
  console.log(req.query)
  let { number } = req.body
  //console.log(req.body)
  //console.log(number)
  //console.log(id)
  if (id == 0) {
    const products = await Product.getAll();
    res.render("products", { products });
    
  } else {
    console.log("bocaaaa: "+id)
  const products = await Product.getById(id)
  console.log(products)
  res.render("products", { products })
  }
  
})

// notes.get("/consulta/:id?", (req, res) => {
//   let ID = req.query.number
//   console.log(ID)
//   let id = req.params.id;
//   let { number } = req.body;
//   console.log(req.body);
//   console.log(number);
// } )

// post carga de productos
notes.post('/', async (req, res) => {
  let check = req.body.check
  console.log(req.body)
  console.log(req.query)
  console.log(req.params)
  if (check=='on') {
    const { name, price, desc, codigo, url, stock } = req.body;
      console.log(req.body)
      const product = new Product(name, price, desc, codigo, url, stock);
      await product.save();
      res.redirect('/api')
  } else {
    res.send({
      error: '999',
      descripcion: 'ruta /agregarProductos method: POST no autorizada'
    })
  }
  
});

// ACTUALIZAR PRODUCTO POR ID
notes.put('/actualizar/:id', async (req, res) => {

  const id = req.params.id;

  console.log(req.body.precio)

  const data = req.body;

  let check = req.body.check

  console.log("esto trae el check" + check)

  if (check) {
  await Product.update(id, data);
    
    res.send('producto actualizado')
  } else {
      res.send({
    error: "999",
    descripcion: "ruta /actualizar method: PUT no autorizada",
  });
  }

 

})


// ELIMINAR PRODUCTO POR ID

notes.get("/leer", async (req, res) => {
  const pepe = await Product.leer()
  console.log(pepe)
})

notes.get('/add', (req, res) => {
  res.render('cargaProductos')
})

module.exports = notes;
