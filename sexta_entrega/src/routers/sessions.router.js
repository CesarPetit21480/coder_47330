import { Router } from 'express';
import UserModel from '../models/user.model.js';
import passport from "passport";

const router = Router();

router.post('/sessions/register', async (req, res) => {
    const { body } = req;

    const newUSer = await UserModel.create(body)
    console.log('usuario Creado', newUSer);
    res.redirect('/login');
})
router.post('/sessions/login', async (req, res) => {

    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
        return res.status(401).send({ message: 'correo o password invalidos' });
    }
    const isValidPass = user.password === password;
    if (!isValidPass) {
        return res.status(401).send('Correo o contraseña invalidos 😨.');
    }
    const { first_name, last_name, rol } = user;

    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {

        req.session.user = { first_name, last_name, email, rol }
    }
    else {
        req.session.user = { first_name, last_name, email }
    }
    res.redirect('/products');
});

router.get('/sessions/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/sessions/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {    
    req.user.rol = undefined;
    req.session.user = req.user;
    res.redirect('/products');
});


router.get('/sessions/logout', (req, res) => {
    req.session.destroy((error) => {
        res.redirect('/login');
    });
});


export default router;


