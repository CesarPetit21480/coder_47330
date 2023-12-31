import { Router } from "express";
import CartController from "../../controllers/cart.controller.js";
import passport from "passport";

const router = Router();

const listProductosCarrito = [];

router.get("/cart", passport.authenticate('jwt', { session: false }),async (req, res, next) => {

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

router.get("/cart/id/:id", passport.authenticate('jwt', { session: false }),async (req, res, next) => {
    const { id } = req.params;
    const carrito = [];

    try {
        const carritoById = await CartController.getById(id);
        carrito.push(carritoById);

        if (!carritoById) {
            res.status(500).json({
                message: `No existe el id de Carrito`,
                payload: id,
            });
        }
        res.render("cart", { carrito });

    } catch (error) {
        next(error);
    }
});
router.post("/cart/manejador", passport.authenticate('jwt', { session: false }),async (req, res,next) => {

    try {
        const carrito = await CartController.getActive();      

        const { body } = req;
        const { productId, cantidad } = body;
        const quantity = Number(cantidad)
        const pid = productId;
        const cid = (carrito) ? carrito._id : undefined

        if (carrito) {        
            const carrito = await CartController.updateById(cid, pid, quantity);
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
            CartController.create(nuevoCarrito)

            res.status(200).json({
                status: "success",
                message: "Carrito Generado Correctamente Correctamente 🚀",
                payload: nuevoCarrito,
            });

        }

    } catch (error) {

        const response = res.status(500).json({
            message: `Error en la operacion 😫 ${error}`
        });
        next(response);

    }
})

router.post("/cart/create",passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { body } = req;

    try {
        const { productId, cantidad } = body;

        const nuevoCarrito = {
            fecha: new Date(),
            products: [{ product: productId, quantity: Number(cantidad) }]

        };
        CartController.create(nuevoCarrito)

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

router.put("/cart/update",passport.authenticate('jwt', { session: false }), async (req, res, next) => {

    const { cid, pid } = req.query;
    const body = req.body;

    const { quantity } = body;

    try {

        const carrito = await CartController.updateById(cid, pid, quantity);

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

    } catch (error) {
        next(error);
    }


});

router.delete("/cart/:cid/product/:pid",passport.authenticate('jwt', { session: false }), async (req, res) => {


    const { cid, pid } = req.params;
    try {

        const carrito = await CartController.deleteProductCartByid(cid, pid);

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

    } catch (error) {
        next(error);
    }


});

router.delete("/cart/:cid", passport.authenticate('jwt', { session: false }),async (req, res, next) => {

    const { cid, pid } = req.params;

    try {

        const carrito = await CartController.deleteProductCart(cid);

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

    } catch (error) {
        next(error);
    }
});


router.delete("/cart/:cid", passport.authenticate('jwt', { session: false }),async (req, res, next) => {

    const { cid } = req.params;

    try {

        await CartController.deleteCart(cid);

        res.json({
            status: "success",
            code: 200,
            message: " Carrito Eliminado correctamente 🚀"
        });

    } catch (error) {
        next(error)
    }

})


export default router;
