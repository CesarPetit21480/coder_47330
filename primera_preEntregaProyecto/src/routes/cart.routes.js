import { CartManager } from "../../model/CartManager.js";
import { Router } from "express";

const router = Router();
const path = "./cart.json";
const cartManager = new CartManager(path);

router.get("/cart", async (req, res) => {
  const carrito = await cartManager.get();
  res.render('cart',carrito)
});


export default router;