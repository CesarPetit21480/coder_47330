import { Router } from 'express';
import UserModel from '../../models/user.model.js';
import passport from "passport";
import { createHash, isValidPassword, tokenGenerator, jwtAuth } from '../../utils.js';


const router = Router();

router.post('/sessions/register', passport.authenticate('register', { failureRedirect: '/register' }), async (req, res, next) => {

    try {
        res.redirect('/login');
    } catch (error) {
        next(error);
    }

})
router.post('/sessions/login', passport.authenticate('login', { failureRedirect: '/login' }), async (req, res) => {

    const user = req.user;
    const token = tokenGenerator(user);
    res.cookie('access_token', token, {
        maxAge: 20000,
        signed: true,
        httpOnly: true
    })
    res.redirect('/products');
});

router.get('/sessions/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/sessions/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {

    const user = req.user;
    const token = tokenGenerator(user);
    res.cookie('access_token', token, { maxAge: 20000, signed: true })
    res.redirect('/products');

});


router.get('/sessions/logout', (req, res) => {
    res.clearCookie('access_token');
    res.redirect('/login');
});


export default router;


