const botonEnviar = document.getElementById("enviar");

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