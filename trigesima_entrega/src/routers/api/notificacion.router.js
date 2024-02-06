import { Router } from 'express';
import path from 'path';
import EmailService from '../../services/email.service.js';
import { __dirname } from '../../utils.js';


const router = Router();

router.get('/sendEmail', async (req, res, next) => {
  try {
    const result = await EmailService.sendEmail(
      'cesar.petit@gmail.com',
      'Esta es un correo de prueba de correo',
      `
      <div>
        <h1>Hola cómo estás?</h1>
        <p>Esta es una prueba de envio de correo desde Node js.</p>
     
      </div>
      `,
      [
        {
          filename: 'image-cat.gif',
          path: path.join(__dirname, './images/cat.gif'),
          cid: 'cat-001',
        }
      ]
    );
    console.log('result', result);
    res.status(200).json({ message: 'Correo enviado correctamente'})
  } catch (error) {
    next(error);
  }
});


export default router