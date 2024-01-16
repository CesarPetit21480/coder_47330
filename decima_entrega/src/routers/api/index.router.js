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


router.get('/loggers', (req, res) => {
  
  req.logger.fatal('Esta es una prueba de log fatal');
  req.logger.warning('Esta es una prueba de log warn');
  req.logger.info('Esta es una prueba de log info');
  req.logger.error('Esta es una prueba de log error');
  req.logger.debug('Esta es una prueba de log debug');
  res.status(200).send('ok');
});

export default router;

