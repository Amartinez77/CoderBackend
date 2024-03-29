// comentar  y descomentar , para usar Firebase o MongoDB
const Products = require("../api/containerProducts");
//const Products = require("../controllers/containerFirebase.js");

 //const products = new Products();
//const products = []

//Get all products or product selected
const getProducts = async (req, res) => {
  if (req.params.id == undefined) {
    //return res.json(await products.getAll());

    let prueba = await products.getAll().lean();
    
        return res.render("datos", { prueba } );
  }
  const product = await Products.getById(req.params.id);
  console.log(product);
  if (!product)
    return res
      .status(404)
      .send({ message: "El ID no pertenece a un producto listado" });
  res.json(product);
  
};

//Add product
const addProduct = async (req, res) => {
  console.log(req.body);
  const { name, description, code, pic, price, stock } = req.body;
  console.log("lllleeeeegggggooooooooooo");
  await products.save({ name, description, code, pic, price, stock });
  res.json({ message: "Producto agregado" });
};

//Update product
const updateProduct = async (req, res) => {
  await products.updateProduct(req.params.id, req.body);
  res.json({ message: "Producto actualizado" });
};

//Delete product
const deleteProduct = async (req, res) => {
  await products.deleteById(req.params.id);
  res.json({ message: "Producto eliminado" });
};

module.exports = {

  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
