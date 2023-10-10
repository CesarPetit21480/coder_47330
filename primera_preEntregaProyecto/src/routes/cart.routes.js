import { CartManager } from "../../model/CartManager.js";
import { Router } from "express";
import { ProductsManager } from "../../model/productManager.js";
import { v4 as uuidv4 } from "uuid";


const router = Router();
const pathCart = "./carts.json";
const pathProd = "./products.json";
const cartManager = new CartManager(pathCart);
const productsManager = new ProductsManager(pathProd);
const listProductosCarrito = [];

router.get("/cart", async (req, res) => {
  const carrito = await cartManager.get();
  res.render("cart", carrito);
});

router.get("/cart", async (req, res) => {
  const carrito = await cartManager.get();
  res.render("cart", carrito);
});

router.post("/cart/create", async (req, res) => {
  const { body } = req;

  try {
    const productosCarrito = body;
    const productosNoEncontrados = [];

    for (let i = 0; i < productosCarrito.length; i++) {
      const productoEncontrado = await productsManager.getProductById(
        productosCarrito[i].id
      );

      if (!productoEncontrado)
        productosNoEncontrados.push(productosCarrito[i].id);
    }

    if (productosNoEncontrados.length > 0) {
      res.status(500).json({
        message: `Los Productos no son parte del Stock`,
        payload: productosNoEncontrados,
      });
    }
    const nuevoCarrito = {
      id: uuidv4(),
      ...productosCarrito,
    };
    await cartManager.createCart(nuevoCarrito);

    res.status(200).json({
      status: "success",
      message: "Carrito Generado Correctamente Correctamente 🚀",
      payload: nuevoCarrito,
    }); 
  } catch (error) {

    res.status(500).json({
      message: `Error en la operacion 😫`,     
    });
  }
});

export default router;
