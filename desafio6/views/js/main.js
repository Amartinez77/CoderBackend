const socket = io.connect();

const tablaProductos = document.getElementById('tablaProductos')

const renderProductos = (productos) => {
  if (productos.length > 0) $tableproductos.innerHTML = "";
  productos.forEach((producto) => {
    tablaProductos.innerHTML += `
		<tr class="text-center">
			<td class="align-middle">${producto.nombre}</td>
			<td class="align-middle">${producto.precio}</td>
			<td class="align-middle">
				<img src="${producto.url}" alt="${producto.name}" width="100px">
			</td>
		</tr>`;
  });
};


function render(data) {
  const html = data.map((elem, index) => {
    return (`<div>
                  <strong>${elem.author}</strong> :
                  <em>${elem.text}</em>
                </div>`)
  }).join(" ");
  
  document.getElementById('messages').innerHTML = html;
}

socket.on('messages', function (data) { render(data); });

function addMessage(e) {
  const mensaje = {
    author: document.getElementById('username').value,
    text: document.getElementById('texto').value
  };

  socket.emit('new-message', mensaje);
  return false;
}