import { Router } from "express";
import ProductsManager from "../../dao/ProductManager.js";
import CartManager from "../../dao/cartManager.js";

const router = Router();

const listProductosCarrito = [];

router.get("/cart", async (req, res) => {
    const carrito = await CartManager.get();
 

    res.render('cart', { carrito: carrito.map(s => s.toJSON()) });   

    
});

router.get("/cart/id/:id", async (req, res) => {
    const { id } = req.params;
    const carrito = [];
    const carritoById = await CartManager.getById(id);
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
    console.log(body);

    try {
        const { _id } = body;
        // const productosNoEncontrados = [];
        // const idProductos = [];    

        // for (let i = 0; i < productosCarrito.length; i++) {
        //   const productoEncontrado = await ProductsManager.getById(
        //     productosCarrito[i].id
        //   );

        //   if (!productoEncontrado)
        //     productosNoEncontrados.push(productosCarrito[i].id);
        //   else{
        //     idProductos.push(productosCarrito[i]._id)
        //   }
        // }

        // if (productosNoEncontrados.length > 0) {
        //   res.status(500).json({
        //     message: `Los Productos no son parte del Stock`,
        //     payload: productosNoEncontrados,
        //   });
        // }



        const nuevoCarrito = {
            fecha: '2023-11-02',
            products : [{product:_id}]
           
        };
        CartManager.create(nuevoCarrito)

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
