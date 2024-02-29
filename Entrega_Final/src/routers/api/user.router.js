import passport from "passport";
import { Router } from "express";
import { createHash, isValidPassword, tokenGenerator, jwtAuth } from '../../utils/util.js';
import EmailService from '../../services/emailServices.js'
import UserController from '../../controllers/user.controller.js'
import { authenticationMiddleware, jwtAuthUrl, authorizarionMiddeleware } from "../../utils/util.js";


const router = new Router();


router.post('/register', passport.authenticate('register'), async (req, res, next) => {
  try {
    res.send({ status: "success", payload: req.user })

    //res.redirect('/login');
  } catch (error) {
    next(error);
  }
})


router.get('/all', authenticationMiddleware('jwt'), authorizarionMiddeleware(["ADMIN"]), async (req, res, next) => {

  try {
    const users = await UserController.getAll();
    res.send({ status: "success", payload: users })
  } catch (error) {
    next(error);
  }
})

router.post('/premium/:uid', authenticationMiddleware('jwt'), authorizarionMiddeleware(["ADMIN"]), async (req, res, next) => {
  try {

    const { uid } = req.params;
    const cambioRoleUser = await UserController.changesRole(uid);

    if (cambioRoleUser)
      res.status(200).json({ message: 'Rol Cambiado Existosamente 😁' });


  } catch (error) {
    next(error);
  }
})

router.get('/:uid', async (req, res, next) => {
  try {

    const { uid } = req.params;
    const user = await UserController.getByid(uid);

    res.status(200).json({ payload: user });


  } catch (error) {
    next(error);
  }
})

router.post('/login', passport.authenticate('login', { failureRedirect: '/login' }), async (req, res) => {
  try {
    const user = req.user;
    const token = tokenGenerator(user, user.email, "login");
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

router.post('/recovery-password/email/:email', async (req, res, next) => {

  const { email } = req.params;

  try {

    const token = tokenGenerator(undefined, email, "recovery");

    const emailService = EmailService.getInstance();
    await emailService.sendRecoveryPasswordEmail(email, token);
    res.status(200).json({ message: 'correo enviado correctamente 😁' });
  } catch (error) {
    next(error);
  }
});

router.get('/reset/:token', async (req, res, next) => {
  const { token } = req.params
  const userToken = jwtAuthUrl(token);
  if (userToken)
    res.render('recovery', { email: userToken.email });
  else {
    res.render('login');
  }

})

router.post('/restablecerPassword/', async (req, res, next) => {

  const { recoveryPassword, password, email } = req.body;

  try {
    const passValida = await UserController.IsvalidatePassword(email, password, recoveryPassword)
    res.status(200).json({ message: 'Passwword Actualizada 😁' });
  } catch (error) {
    next(error);
  }
})

router.get('/logout', (req, res) => {
  res.clearCookie('access_token');
  res.redirect('/login');
});

export default router;