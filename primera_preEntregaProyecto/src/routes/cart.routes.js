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
  console.log(carrito);
  res.render("cart", { carrito });
});

router.get("/cart/id/:id", async (req, res) => {
  const { id } = req.params;
  const carrito = [];
  const carritoById = await cartManager.getCartById(id);
  carrito.push(carritoById);

  if (!carritoById) {
    res.status(500).json({
      message: `No existe el id de Carrito`,
      payload: id,
    });
  }

  res.render("cart", { carrito });
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
    console.error(error);
    res.status(500).json({
      message: `Error en la operacion 😫 ${error}`,
      
    });
  }
});

router.post("/cart/add/cid/:cid/pid/:pid", async (req, res) => {
  console.log("entre");
  const { cid, pid } = req.params;
  const body = req.body;

  const { quantity } = body;

  const carrito = await cartManager.updateCarrito(cid, pid, quantity);

  if (!carrito)
    res.status(500).json({
      message: `Id Carrito Inexistente`,
      payload: `id Carrito ${cid}`,
    });

  res.json({
    status: "success",
    message: "Producto Actualizado Correctamente Correctamente en Carrito 🚀",
    payload: carrito,
  });
});

export default router;
