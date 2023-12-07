import passport from "passport";
import {Router} from "express";
import { createHash, isValidPassword, tokenGenerator, jwtAuth } from '../utils.js';


const router = new Router();


router.post('/register', passport.authenticate('register', { failureRedirect: '/register' }), async (req, res) => {
    res.redirect('/login');
})
router.post('/user/login', passport.authenticate('login', { failureRedirect: '/login' }), async (req, res) => {
    
    const user = req.user;
    const token = tokenGenerator(user);
    res.cookie('access_token', token, { 
        maxAge: 6000000, 
        signed: true,
        httpOnly: true})
    res.redirect('/current');
});

export default router;