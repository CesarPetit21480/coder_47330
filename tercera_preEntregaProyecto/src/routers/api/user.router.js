import passport from "passport";
import { Router } from "express";
import { createHash, isValidPassword, tokenGenerator, jwtAuth } from '../../utils.js';
import EmailService from '../../services/emailServices.js'


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


const urlRecoveryPassStep2 = 'https://google.com';

router.post('/recovery-password', (req, res, next) => {
  try {
    const { email } = req.body;
    const result = EmailService.sendEmail(
      email,
      'Recuperacion de contraseña',
      `<p> Para recuperar tu contraseña, debes acceder al siguiente enlace: <a href="${urlRecoveryPassStep2}">AQUI</a> </p>
      <img src="cid:saludo-001" />
      `,
      [
        {
          filename: 'saludo.png',
          path: path.join(__dirname, './images/cat.gif'),
          cid: 'saludo-001',
        }
      ]
    );
    console.log('result', result);
    res.status(200).json({ message: 'correo enviado correctamente 😁'});
  } catch (error) {
    next(error);
  }
});



export default router;