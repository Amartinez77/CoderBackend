

const botonEnviar = document.getElementById("enviar");




//Evento de actualizacion de productos
botonEnviar.addEventListener('click', e => {
  const id = document.getElementById('id');
  const name = document.getElementById('nameNuevo');
  const precio = document.getElementById('precioNuevo');
  const desc = document.getElementById('descNuevo');
  const cod = document.getElementById('codigoNuevo');
  const url = document.getElementById('urlNuevo');
  const stock = document.getElementById('stockNuevo');
  const check = document.getElementById('check');

  if (id) {

    const data = {
      ident: id.value,
      name : name.value,
      precio: precio.value,
      desc: desc.value,
      cod: cod.value,
      url: url.value,
      stock: stock.value,
      check: check.checked
    }

    fetch(`http://localhost:8080/api/actualizar/${data.ident}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => console.log(result.json()));
    
  } else {
    throw('debe ingresar algo')
  }
})


//evento de eliminar productos

const delEnviar = document.getElementById('delEnviar');
//const del = document.getElementById('del');



delEnviar.addEventListener('click', e => {
  const del = document.getElementById("del");
  const checkD = document.getElementById("checkD")

  const data2 = {
    del: del.value,
    check: checkD.checked
}

  fetch(`http://localhost:8080/api/eliminar/${data2.del}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data2),
  });


})

// evento crear carrito

const cart = document.getElementById('cart')

cart.addEventListener('click', e => {

  const cart= document.getElementById('nombreCarrito')
  
  const carrito = {
    nombre: cart.value,
    timestamp: Date.now(),
    productos: [],
    id:0
  }

  

  fetch("http://localhost:8080/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(carrito)
    
  });
})


//evento agregar productos al carrito por id

// const btnEnviar = document.getElementById('botonCart');

// btnEnviar.addEventListener('click', e => {

//   const id = document.getElementById('idCart');

//   const data = {
//     id: id.value
//   }

//   fetch(`http://localhost:8080/api/cart/add/${data.id}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },

//   });

// })