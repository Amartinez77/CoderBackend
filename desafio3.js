import express from "express";
import fs from "fs"
//const fs = require("fs");
const app = express();



app.get("/productos", (req, res) => {
  fs.readFile("./productos.txt", (err, data) => {
    if (err) return console.error(err);
    const dataString = data.toString();
    res.send(dataString)
    console.log(dataString);
  });
});

app.get("/productoRandom", (req, res) => {
  fs.readFile("./productos.txt", (err, data) => {
    if (err) return console.error(err);

    let data2 = JSON.parse(data)
    const aleatorio = data2[Math.floor(Math.random() * data2.length)];
    console.log(aleatorio)
  
  });
})

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${server.address().port}`);
})

server.on("error", (error) => console.log(`Error en servidor ${error}`));

