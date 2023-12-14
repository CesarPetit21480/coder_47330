import { Router } from "express";
import ProductsManager from "../../dao/product.dao.js";
import CartManager from "../../dao/cart.dao.js";
import CartController from "../../controllers/cart.controller.js";

const router = Router();

const listProductosCarrito = [];

router.get("/cart", async (req, res) => {

    try {
        const carrito = await CartController.get();
        res.render('cart', { carrito: carrito });
    } catch (error) {
        next(res.status(error.statusCode || 500).json({ message: error.message }));
    }
});

router.get("/cart/active", async (req, res) => {

    const carrito = await CartController.getActive();
    return carrito;
})

router.get("/cart/id/:id", async (req, res) => {
    const { id } = req.params;
    const carrito = [];
    const carritoById = await CartController.getById(id);
    carrito.push(carritoById);

    if (!carritoById) {
        res.status(500).json({
            message: `No existe el id de Carrito`,
            payload: id,
        });
    }
    res.render("cart", { carrito });
});


router.post("/cart/manejador", async (req, res) => {

    try {
        const carrito = await CartController.getActive();   

        const { body } = req;
        const { productId, cantidad } = body;
        const quantity = Number(cantidad)
        const pid = productId;

        if (carrito !== 0) {

            const cid = carrito._id
            const carrito = await CartManager.updateById(cid, pid, quantity);
            res.json({
                status: "success",
                message: "Producto Actualizado Correctamente Correctamente en Carrito 🚀",
                payload: carrito,
            });

        }
        else {

            const nuevoCarrito = {
                fecha: new Date(),
                products: [{ product: productId, quantity: Number(cantidad) }]

            };
            CartManager.create(nuevoCarrito)

            res.status(200).json({
                status: "success",
                message: "Carrito Generado Correctamente Correctamente 🚀",
                payload: nuevoCarrito,
            });

        }

    } catch (error) {
        console.error(error);      
        res.status(500).json({
            message: `Error en la operacion 😫 ${error}`
        });

    }
})

router.post("/cart/create", async (req, res) => {
    const { body } = req;

    try {
        const { productId, cantidad } = body;

        const nuevoCarrito = {
            fecha: new Date(),
            products: [{ product: productId, quantity: Number(cantidad) }]

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

router.put("/cart/update", async (req, res) => {

    const { cid, pid } = req.query;
    const body = req.body;

    const { quantity } = body;

    const carrito = await CartManager.updateById(cid, pid, quantity);

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


router.delete("/cart/:cid/product/:pid", async (req, res) => {


    const { cid, pid } = req.params;
    const carrito = await CartManager.deleteProductCartByid(cid, pid);

    if (!carrito)
        res.status(500).json({
            message: `Id Carrito Inexistente`,
            payload: `id Carrito ${cid}`,
        });

    res.json({
        status: "success",
        message: "Producto Borrado Correctamente Correctamente en Carrito 🚀",
        payload: carrito,
    });

});


router.delete("/cart/:cid", async (req, res) => {


    const { cid, pid } = req.params;
    const carrito = await CartManager.deleteProductCart(cid);

    if (!carrito)
        res.status(500).json({
            message: `Id Carrito Inexistente`,
            payload: `id Carrito ${cid}`,
        });

    res.json({
        status: "success",
        message: "Productos Borrados Correctamente Correctamente en Carrito 🚀",
        payload: carrito,
    });

});



export default router;
