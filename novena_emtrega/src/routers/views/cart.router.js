
import { Router } from "express";
import passport from "passport";
import CartController from '../../controllers/cart.controller.js';
import { authenticationMiddleware, authorizarionMiddeleware } from '../../utils/util.js'


const router = Router();
router.get("/cart", authenticationMiddleware("jwt"), async (req, res, next) => {

    try {
        const carrito = await CartController.get();
        res.render('cart', { carrito: carrito });
    } catch (error) {
        next(res.status(error.statusCode || 500).json({ message: error.message }));
    }
});

export default router;