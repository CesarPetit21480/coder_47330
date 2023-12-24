import passport from "passport";
import { Router } from "express";
import { createHash, isValidPassword, tokenGenerator, jwtAuth } from '../../utils.js';


const router = new Router();


router.post('/register', passport.authenticate('register', { failureRedirect: '/register' }), async (req, res, next) => {

    try {
        res.redirect('/login');
    } catch (error) {
        next(error);
    }


})
router.post('/login', passport.authenticate('login', { failureRedirect: '/login' }), async (req, res) => {

    try {
        const user = req.user;
        const token = tokenGenerator(user);
        res.cookie('access_token', token, {
            maxAge: 6000000,
            signed: true,
            httpOnly: true
        })
        res.redirect('/products');

    } catch (error) {
        next(error);
    }
});


router.get('/logout', (req, res) => {
    res.clearCookie('access_token');
    res.redirect('/login');
});


export default router;