const author = new normalizr.schema.Entity("author");
const text = new normalizr.schema.Entity("text", {
  author: author,
});
const denormalizar = (obj) => {
  return normalizr.denormalize(obj.result, text, obj.entities);
};

let socket = io.connect();

socket.on("productos", (data) => {
  render(data);
  //console.log(data[0].name)
});

socket.on("messages", (data) => {
  renderMessages(data);
});

async function render(data) {
  let html = await data
    .map((elem, index) => {
      return `<tr>
    <td>${elem.name}</td>
    <td>${elem.price}</td>
    <td><img src="${elem.pic}" alt="Imagen del producto"></td>
    <td><button class="addToCart" id="${elem._id}">addToCart</button></td>
    </tr>`;
    })
    .join(" ");
  document.getElementById("tbproducts").innerHTML = html;

  let botonesComprar = document.querySelectorAll(".addToCart");

  console.log(botonesComprar);

  botonesComprar.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      console.log(e.target.id);

      if (localStorage.carrito) {
        //solucionar problema
        let carrito = JSON.parse(localStorage.carrito);
        console.log(carrito);
        let index = carrito.findIndex((prod) => prod.id == e.target.id);
        if (index != -1) {
          carrito[index].cantidad = carrito[index].cantidad + 1;
        } else {
          carrito.push({ id: e.target.id, cantidad: 1 });
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
      } else {
        localStorage.setItem(
          "carrito",
          JSON.stringify([{ id: e.target.id, cantidad: 1 }])
        );
      }
      Toastify({
        text: "producto agregado!",
        duration: 3000,
      }).showToast();
    });
  });
}

function renderMessages(data) {
  const denormalizedMessages = denormalizar(data);
  let html = denormalizedMessages.messages
    .map((elem, index) => {
      return `<div>
        <span style="color: blue; font-weight: bold;">${elem.author.nombre}</span>
        <span style="color: blue; font-weight: bold;">${elem.author.apellido}</span>
        <span style="color: blue; font-weight: bold;">(${elem.author.id}),</span>
        <span style="color: blue; font-weight: bold;">(${elem.author.alias})</span>
        <span style="color: blue; font-weight: bold;"><img src="${elem.author.avatar}" alt="Avatar del usuario" style="height: 50px;"></span>
        <span style="color: brown;">[${elem.date}]:</span>
        <span style="color: green; font-style: italic;">${elem.text}</span></div>`;
    })
    .join(" ");
  document.getElementById("messages").innerHTML = html;
}

function addProduct(e) {
  let producto = {
    title: document.getElementById("name").value,
    price: document.getElementById("price").value,
    thumbnail: document.getElementById("pic").value,
  };
  socket.emit("new-product", producto);
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("pic").value = "";
  return false;
}

function addMessage(e) {
  let message = {
    author: {
      id: document.getElementById("email").value,
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,
      edad: document.getElementById("edad").value,
      alias: document.getElementById("alias").value,
      avatar: document.getElementById("avatar").value,
    },
    text: document.getElementById("message").value,
    date: formatDate(),
  };
  socket.emit("new-message", message); // new-message es el nombre del evento (recordatorio)

  document.getElementById("message").value = "";
  document.getElementById("message").focus();

  return false;
}

const formatDate = () => {
  let date = new Date();
  let formatted_date = `${date.getDate()}/${("0" + (date.getMonth() + 1)).slice(
    -2
  )}/${date.getFullYear()} ${date.getHours()}:${
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
  }:${date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()}`;
  return formatted_date;
};
