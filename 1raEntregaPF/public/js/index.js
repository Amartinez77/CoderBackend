const botonEnviar = document.getElementById("enviar");

botonEnviar.addEventListener('click', e => {
  const id = document.getElementById('id');
  if (id) {

    fetch("http://localhost:8080/api/actualizar/");
    
  } else {
    throw('debe ingresar algo')
  }
})