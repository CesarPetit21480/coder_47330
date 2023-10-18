import { Router } from "express";
import { ProductsManager } from "../../model/productManager.js";
import { v4 as uuidv4 } from "uuid";

const router = Router();
const path = "./products.json";
const productsManager = new ProductsManager(path);

router.get('/',async (req, res) => {
  
  const products = await productsManager.get();
  res.render("home",{products});
});

router.get('/realProducts',async (req, res) => {
  res.render("realTimeProducts");
});

export default router;
