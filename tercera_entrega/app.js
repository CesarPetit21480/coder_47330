import express from "express";

const app = express();

app.get("/", (req, res) => {
  const bienvenida = `<h1 style="color: red;">BIENVENIDO AL HOME </h1>`;
  res.send(bienvenida);
});

app.get("/Products", (req, res) => {
  res.send("Traigo Productos");
});

app.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080.");
});
