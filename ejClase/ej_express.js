import express from "express";
//const express = require("express");


const app = express();

const frase = "Hola mundo como están";

app.get("/api/getFrase", (req, res) => {
  res.send(frase);
});

app.get("/api/getLetra/:num", (req, res) => {
  let num = parseInt(req.params.num);
  //console.log(num)
  if (!isNaN(num)) {
    if (num >= 1 && num <= frase.length) {
      res.send(frase[num - 1]);
    } else {
      res.send({ error: "El parámetro está fuera de rango" });
    }
  } else {
    res.send({ error: "El parámetro ingresado no es un número" });
  }
});

app.get("/api/getPalabra/:num", (req, res) => {
  let num = parseInt(req.params.num);
  //console.log(num)
  if (!isNaN(num)) {
    let palabras = frase.split(" ");
    if (num >= 1 && num <= palabras.length) {
      res.send(palabras[num - 1]);
    } else {
      res.send({ error: "El parámetro está fuera de rango" });
    }
  } else {
    res.send({ error: "El parámetro ingresado no es un número" });
  }
});

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
