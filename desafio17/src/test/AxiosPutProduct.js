//const axios = require(`axios`);
import axios from "axios";

const putProduct = async () => {
  const putProduct = await axios.put(
    //6412810700706bbabc2c88da
    `http://localhost:8080/api/productos/6412810700706bbabc2c88da`,
    {
      title: `producto MODIFICADO desde Axios`,
      timestamp: new Date().toDateString(),
      price: 5555,
      description: `descripción desde Axios`,
      code: `aaa49`,
      image: `URL desde Axios`,
      stock: 3,
    }
  );

  console.log({
    status: putProduct.status,
    data: putProduct.data,
  });
};

putProduct();
