//const axios = require(`axios`);
import axios from "axios";

const deleteProduct = async () => {
  const deleteProduct = await axios.delete(
    // id 64127947007a37c56a102c18   este id lo saque de la base de datos
    `http://localhost:8080/api/productos/64127947007a37c56a102c18`
  );
  console.log({
    status: deleteProduct.status,
    data: deleteProduct.data,
  });
};

deleteProduct();
