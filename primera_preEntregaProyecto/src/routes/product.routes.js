import { Router } from "express";
import { ProductsManager } from "../../model/productManager.js";

const router = Router();
const path = "./products.json";
const productsManager = new ProductsManager(path);

router.get("/products", async (req, res) => {
  const { limit } = req.query;
  const productos = await productsManager.get();

  if (!limit) {
    res.json(productos);
  } else {
    const productosLimit = productos.slice(0, limit);
    res.json(productosLimit);
  }
});

router.get("/products/id/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const productByid = await productsManager.getProductById(id);
    res.json(productByid);
  } catch (error) {
    res
      .status(500)
      .send({ error: `ID INEXISTENTE REINTENTE!!!!`, status: 500 });
  }
});

export default router;
