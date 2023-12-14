import { Router } from "express";
import ProductManager from "../../dao/ProductManager.js";
import passport from "passport";
import { privateRouter } from "../../utils.js";
import { jwtAuth, isSuperAdmin, authenticationMiddleware, authorizarionMiddeleware } from '../../utils.js';



const router = Router();


router.get('/current', passport.authenticate('jwt', { session: false }), async (req, res) => {


    const info = { user: req.user }
    res.render('current', { info });

});


export default router;