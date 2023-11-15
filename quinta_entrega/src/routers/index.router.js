import { Router } from 'express';



const router = Router();


const privateRouter = (req, res, next) =>{
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
};

const publicRouters = (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/products');
  }
  next();
}

router.get('/products', privateRouter, (req, res) => {
  res.render('products', { title: 'Perfil', user: req.session.user });
});


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

