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
    const { name, price } = req.body;
      console.log(req.body)
      const product = new Product(name, price);
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
notes.put('/actualizar/:id?', (req, res) => {
  
})


notes.get('/add', (req, res) => {
  res.render('cargaProductos')
})

module.exports = notes;
