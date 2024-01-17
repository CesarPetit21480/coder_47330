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


router.get('/loggersProd', (req, res) => {  

  req.logger.fatal('Esta es una prueba de log fatal PROD');
  req.logger.warning('Esta es una prueba de log warn PROD');
  req.logger.info('Esta es una prueba de log info PROD');
  req.logger.error('Esta es una prueba de log error PROD');
  req.logger.debug('Esta es una prueba de log debug PROD');
  res.status(200).send('ok');
});


router.get('/loggersDev', (req, res) => {
  
  req.logger.fatal('Esta es una prueba de log fatal DEV');
  req.logger.warning('Esta es una prueba de log warn DEV');
  req.logger.info('Esta es una prueba de log info DEV');
  req.logger.error('Esta es una prueba de log error DEV');
  req.logger.debug('Esta es una prueba de log debug DEV');
  res.status(200).send('ok');
});

export default router;

