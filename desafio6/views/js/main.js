//const { Socket } = require("socket.io");

const socket = io.connect();
//const socket = io();

const inputNombre = document.getElementById("nombre");
const inputPrecio = document.getElementById("precio");
const inputUrl = document.getElementById("url");

const agregarProducto = document.getElementById("agregarProductos");

agregarProducto.addEventListener("submit", (e) => {
  e.preventDefault();

  console.log("holaaaaa");
  const producto = {
    nombre: inputNombre.value,
    precio: inputPrecio.value,
    url: inputUrl.value,
  };
  console.log(producto);
  socket.emit("newProducto", producto);
  e.target.reset();
  //location.href = "/";
});

//renderiza los productos

const tableProducts = document.getElementById("table-products");

const renderProductos = (productos) => {
  console.log("pepitp");

  // if (productos.length > 0) $tableProducts.innerHTML = "";
  productos.forEach((producto) => {
    tableProducts.innerHTML += `
		<tr class="text-center">
			<td class="align-middle">${producto.nombre}</td>
			<td class="align-middle">${producto.precio}</td>
			<td class="align-middle">
				<img src="${producto.url}" alt="${producto.name}" width="100px">
			</td>
		</tr>`;
  });
};

socket.on("productos", function (productos) {
  console.log(productos);
  renderProductos(productos);
});

// renderiza el chat

const chat = document.getElementById("messages");

const render = messages => {
  //console.log(messages);
  messages.forEach(message => {
    if (messages.length > 0) chat.innerHTML = "";
    chat.innerHTML += `
                <div>
			<b class="text-primary">${message.author}</b>
			[<span style="color: brown;">${message.date}</span>]
			: <i class="text-success">${message.text}</i>
		</div > `;
  });
}

// function render(data) {
//   console.log(data)
//   data.forEach((elem, index) => {
//     return (`<div>
//                   <strong>${elem.author}</strong> :
//                   <em>${elem.text}</em>
//                 </div>`)
//   }).join(" ");

//   document.getElementById('messages').innerHTML = html;
// }

const chatForm = document.getElementById("chatForm");
const author = document.getElementById("username")
const text = document.getElementById("texto")

chatForm.addEventListener('submit', e => {
  e.preventDefault();
  const newMessage = {
    author: author.value,
    text: text.value,
    date: new Date().toLocaleString(),
  };
  console.log(newMessage)
socket.emit("newMessage", newMessage);
e.target.reset();

})

socket.on("messages", messages => {
  render(messages);
});

// function addMessage(e) {
//   const mensaje = {
//     author: document.getElementById("username").value,
//     text: document.getElementById("texto").value,
//   };

//   socket.emit("new-message", mensaje);
//   return false;
// }


