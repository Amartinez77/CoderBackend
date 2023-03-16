//const axios = require(`axios`);
import axios from "axios";

const addProduct = async () => {
  const addProduct = await axios.post(`http://localhost:8080/api/productos`, {
    title: `producto desde Axios`,
    timestamp: new Date().toDateString(),
    price: 9999,
    description: `descripción desde Axios`,
    code: `qq99`,
    image: `URL desde Axios`,
    stock: 3,
  });

  console.log({
    status: addProduct.status,
    data: addProduct.data,
  });
};

addProduct();
