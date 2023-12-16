
import { Router } from "express";
import passport from "passport";
import { isSuperAdmin } from '../../utils.js';
import CartController from '../../controllers/cart.controller.js';


const router = Router();
router.get("/cart", passport.authenticate('jwt', { session: false }), async (req, res, next) => {

    try {
        const carrito = await CartController.get();
        res.render('cart', { carrito: carrito });
    } catch (error) {
        next(res.status(error.statusCode || 500).json({ message: error.message }));
    }
});

export default router;