import { Router } from "express";
import CartController from "../../controllers/cart.controller.js";
import RejectController from "../../controllers/reject.controller.js";
import passport from "passport";
import userController from "../../controllers/user.controller.js";
import { authenticationMiddleware, authorizarionMiddeleware } from '../../utils.js';

const router = Router();

const listProductosCarrito = [];

router.get("/cart", passport.authenticate('jwt', { session: false }), async (req, res, next) => {

    try {
        const carrito = await CartController.get();
        res.render('cart', { carrito: carrito });
    } catch (error) {
        next(res.status(error.statusCode || 500).json({ message: error.message }));
    }
});

router.get("/cart/active", async (req, res, next) => {
    try {
        const carrito = await CartController.getActive();
        return carrito;

    } catch (error) {
        next(res.status(error.statusCode || 500).json({ message: error.message }));
    }


})

router.get("/cart/id/:id", passport.authenticate('jwt', { session: false }), async (req, res, next) => {
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
        next(res.status(error.statusCode || 500).json({ message: error.message }));
    }
});
router.post("/cart/manejador", authenticationMiddleware('jwt'), authorizarionMiddeleware(["USER"]), async (req, res, next) => {

    try {
        const carrito = await CartController.getActive();

        const { body } = req;
        const { productId, cantidad, userId } = body;
        const quantity = Number(cantidad)
        const pid = productId;
        const cid = (carrito) ? carrito._id : undefined
        const userBase = await userController.getByid(userId)

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
                products: [{ product: productId, quantity: Number(cantidad) }],
                user: userBase._id

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

router.post("/cart/create", passport.authenticate('jwt', { session: false }), async (req, res) => {
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

router.put("/cart/update", passport.authenticate('jwt', { session: false }), async (req, res, next) => {

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

router.delete("/cart/:cid/product/:pid", passport.authenticate('jwt', { session: false }), async (req, res) => {


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

router.delete("/cart/:cid", passport.authenticate('jwt', { session: false }), async (req, res, next) => {

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


router.delete("/cart/:cid", passport.authenticate('jwt', { session: false }), async (req, res, next) => {

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


router.post("/cart/:cid/purchase", async (req, res, next) => {

    const { cid } = req.params;

    const carrito = await CartController.getById(cid);
    const cantProducts = carrito.products.length;
    const products = carrito.products;

    for (let i = 0; i < cantProducts; i++) {

        const idProduct = products[i].product
        const quantity = products[i].quantity
        const userId = carrito.user
        const hayStock = await CartController.verificarStock(idProduct, quantity);

        if (!hayStock) {

            const reject = await RejectController.getActive();

            if (!reject) {
                const nuevoReject = {
                    fecha: new Date(),
                    products: [{ product: idProduct, quantity: Number(quantity) }],
                    user: userId
                };
                RejectController.createReject(nuevoReject)
            }
            else {

                const reject = await RejectController.updateById(reject._id, idProduct);
                res.json({
                    status: "success",
                    message: "Producto agrego Producto reject 🚀",
                    payload: reject,
                });
            }
            const carrito = await CartController.deleteProductCartByid(cid, idProduct);
                }

    }

});


export default router;
