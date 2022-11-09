const socket = io.connect();

// socket.on('messages', (data) => {
//   console.log(data)
// })


function render(data) {

  const mensajesParaMostrar = mensajes.map(({ fecha, autor, texto }) => {
    return `<li>${fecha} - ${autor}: ${texto}</li>`;
  });

  const mensajesHtml = `
<ul>
${mensajesParaMostrar.join("\n")}
</ul>`;

  const listaMensajes = document.getElementById("listaMensajes");
  listaMensajes.innerHTML = mensajesHtml;

}

socket.on("mensajesActualizados", (mensajes) => {
  render(mensajes);
});

const botonEnviar = document.getElementById("botonEnviar");

botonEnviar.addEventListener("click", (e) => {
  const inputAutor = document.getElementById("inputAutor");
  const inputMensaje = document.getElementById("inputMensaje");

  if (inputAutor.value && inputMensaje.value) {
    const mensaje = {
      author: inputAutor.value,
      text: inputMensaje.value,
    };
    socket.emit("nuevoMensaje", mensaje);
  } else {
    alert("ingrese algun mensaje");
  }
});