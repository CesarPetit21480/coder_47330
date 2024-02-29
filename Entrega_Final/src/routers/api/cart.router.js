import { Router } from "express";
import CartController from "../../controllers/cart.controller.js";
import RejectController from "../../controllers/reject.controller.js";
import ProductsController from "../../controllers/products.controller.js";
import passport from "passport";
import userController from "../../controllers/user.controller.js";
import { authenticationMiddleware, authorizarionMiddeleware, InvalidDataException, NotFoundException } from '../../utils/util.js'
import PurchaseController from "../../controllers/purchase.controller.js";
import { generatorCartError } from '../../utils/causeMessageError.js'
import { v4 as uuidv4 } from 'uuid';


const router = Router();

const listProductosCarrito = [];

router.get("/", passport.authenticate('jwt', { session: false }), async (req, res, next) => {

    try {
        const carrito = await CartController.get();
        res.json({
            status: "success",
            message: "Producto en Carrito 🚀",
            payload: carrito,
        });

    } catch (error) {
        next(res.status(error.statusCode || 500).json({ message: error.message }));
    }
});

router.get("/active", async (req, res, next) => {
    try {
        const carrito = await CartController.getActive();
        res.json({
            status: "success",
            message: "Carrito Activo 🚀",
            payload: carrito,
        });

    } catch (error) {
        next(error);
    }
})

router.get("/id/:id", passport.authenticate('jwt', { session: false }), async (req, res, next) => {
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
router.post("/manejador", authenticationMiddleware('jwt'), authorizarionMiddeleware(["USER", "PREMIUM"]), async (req, res, next) => {

    try {
        const carrito = await CartController.getActive();

        const { body } = req;
        const { productId, cantidad, userId } = body;
        const quantity = Number(cantidad)
        const pid = productId;
        const cid = (carrito) ? carrito._id : undefined

        if (
            !productId ||
            !cantidad ||
            !userId
        ) {
            CustomError.createError({
                name: 'Error generando cart',
                cause: generatorCartError({
                    productId,
                    cantidad,
                    userId
                }),
                message: 'Ocurrio un error mientras intentamos generar un Carrito.',
                code: EnumsError.BAD_REQUEST_ERROR,
            });
        }

        const userBase = await userController.getByid(userId)

        const product = await ProductsController.getById(productId);

        if (product.owner === userBase.email) {
            throw new InvalidDataException(`El usuario no puede comprar su propio producto 😱`);
        }


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
        next(error);
    }
})

router.post("/create", passport.authenticate('jwt', { session: false }), async (req, res) => {
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

router.put("/update", passport.authenticate('jwt', { session: false }), async (req, res, next) => {

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

router.delete("/:cid/product/:pid", passport.authenticate('jwt', { session: false }), async (req, res) => {


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

router.delete("/:cid", passport.authenticate('jwt', { session: false }), async (req, res, next) => {

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


router.delete("/:cid", passport.authenticate('jwt', { session: false }), async (req, res, next) => {

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


router.post("/:cid/purchase", async (req, res, next) => {

    try {

        const { cid } = req.params;
        const carrito = await CartController.getById(cid);
        let amountProduct = 0;

        if (!carrito) {
            throw new Error("carrito not found");
        }
        const cantProducts = carrito.products.length;
        const products = carrito.products;
        const userId = carrito.user

        for (let i = 0; i < cantProducts; i++) {

            const idProduct = products[i].product
            const quantity = products[i].quantity
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
                    const rejectUptate = await RejectController.updateById(reject._id, idProduct);
                }
                const carrito = await CartController.deleteProductCartByid(cid, idProduct);
            }
            else {

                const product = await ProductsController.getById(idProduct)
                product.stock -= quantity;
                const monto = product.price * quantity;
                amountProduct += monto;
                await ProductsController.updateById(idProduct, product);
            }
        }
        const nuevoTicket = {
            purchase_datetime: new Date(),
            code: uuidv4(),
            amount: Number(amountProduct),
            cart: { cart: cid },
            user: { user: userId }
        };

        await PurchaseController.create(nuevoTicket);
        const tickeGenerado = await PurchaseController.get();


        res.json({
            status: "success",
            message: "ticket generado🚀",
            payload: tickeGenerado,
        });


    } catch (error) {
        next(error);
    }


});
export default router;


