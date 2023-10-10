import { Router } from "express";
import { ProductsManager } from "../../model/productManager.js";
import { v4 as uuidv4 } from "uuid";

const router = Router();
const path = "./products.json";
const productsManager = new ProductsManager(path);

router.get("/products", async (req, res) => {
  const { limit } = req.query;
  let tieneLimite;

  if (limit) tieneLimite = true;
  else tieneLimite = false;

  const products = await productsManager.get();

  if (!limit) {
    res.render("products", { products });
  } else {
    const productsLimit = products.slice(0, limit);
    res.render("products", { productsLimit, hasLimit: tieneLimite });
  }
});

router.get("/products/id/:id", async (req, res) => {
  const { id } = req.params;
  const products = [];

  try {
    const productsByid = await productsManager.getProductById(id);
    products.push(productsByid);
    res.render("products", { products });
  } catch (error) {
    res
      .status(500)
      .send({ error: `ID INEXISTENTE REINTENTE!!!!`, status: 500 });
  }
});

router.get("/registro", (req, res) => {
  res.render("productsRegister");
});

router.post("/product", (req, res) => {
  const { body } = req;

  const newProduct = {
    id: uuidv4(),
    thumbnails: [],
    ...body,
  };

  productsManager.createProduct(newProduct);

  res.json({
    status: "success",
    message: "Usuario Creado Correctamente 🚀",
    payload: newProduct,
  });
});

// router.get("/updateProduct", (req, res) => {
//   res.render("productsUpdate");
// });

router.put("/product/update/id/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const productoActualizado = await productsManager.updateProductById(id, body);

  res.json({
    status: "success",
    message: "Producto Actualizado Correctamente Correctamente 🚀",
    payload: productoActualizado,
  });
});

router.delete("/product/delete/id/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const productoEliminar = await productsManager.deleteProductByid(id)
    res.json({
      status: "success",
      message: "Producto Eliminado Correctamente Correctamente 🚀",
      payload: productoEliminar,
    });

  } catch (error) {
    res.status(500).json({ status: 'error', error });
  }
});

export default router;
