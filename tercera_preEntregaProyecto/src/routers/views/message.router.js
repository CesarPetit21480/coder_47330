import { Router } from 'express';
import MessageManager from '../../dao/messageManager.js';
const router = Router();

router.get('/message', async (req, res) => {
    const { query = {} } = req;
    const msg = await MessageManager.get(query);  

//   res.render('mesagges', { msg: msg.map(s => s.toJSON()) });

    res.render('messages', { msg: msg.map(s => s.toJSON()) });

});

router.post('/message', async (req, res) => {    
    const { body } = req;
    console.log(body);    
    const message = await MessageManager.create(body);
    const msg = await MessageManager.get();      
    res.render('messages', { msg: msg.map(s => s.toJSON()) })



});

export default router;