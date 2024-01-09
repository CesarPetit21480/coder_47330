import { Router } from 'express';
import { publicRouters } from '../../utils/util.js';


const router = Router();

router.get('/login', publicRouters, (req, res) => {
  res.render('login', { title: 'Login' });
});

router.get('/register', publicRouters, (req, res) => {
  res.render('register', { title: 'REGISTRO USUARIO 👮‍♂️' });
});

router.get('/recovery-password', publicRouters, (req, res) => {
  res.render('recovery-password', { title: 'Recuperar Contraseña 🚀' });
});

export default router;

