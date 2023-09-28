import express from "express";
import { ProductsManager, Product } from "./model/productManager.js";

const path = "./products.json";
const app = express();
const productManager = new ProductsManager(path);

// creo Productos

// let productoNuevo = new Product(
//   "Naranja",
//   "Naranja Rica",
//   2500,
//   "sin imagen",
//   "abc121",
//   25
// );
// await productManager.createProduct(productoNuevo)

// Traigo Los Productos Archivos

const productos = await productManager.get();

app.get("/", (req, res) => {
  const bienvenida = ` <div style=" background-color: gray;border: solid 1px black;padding: 20px;display: flex; justify-content: center;background-color: gray;">
  <h1 style="color: blue;">TERCERA ENTREGA PROYECTO</h1>
</div>`;
  res.send(bienvenida);
});

app.get("/products", (req, res) => {
  const { limit } = req.query;

  if (!limit) {
    res.json(productos);
  } else {
    const productosLimit = productos.slice(0, limit);
    res.json(productosLimit);
  }
});

app.get("/products/id/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const productByid = await productManager.getProductById(id);
    res.json(productByid);
  } catch (error) {
    res
      .status(500)
      .send({ error: `ID INEXISTENTE REINTENTE!!!!`, status: 500 });
  }
});

app.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080.");
});
