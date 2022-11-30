const send = document.getElementById('sendMsg')

send.addEventListener('click', e => {
  e.preventDefault();

  const id = document.getElementById('idBusc');
  const name = document.getElementById('name')
  const price = document.getElementById("price");
  const desc = document.getElementById("desc");
  const codigo = document.getElementById("codigo");
  const url = document.getElementById("url");
  const stock = document.getElementById("stock");

  if (id) {
    const data = {
      id: id.value,
      name: name.value,
        price: price.value,
        desc: desc.value,
        codigo: codigo.value,
        url: url.value,
      stock: stock.value
    }

    fetch(`http://localhost:8080/api/cart/${data.id}/productos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });


  }
})