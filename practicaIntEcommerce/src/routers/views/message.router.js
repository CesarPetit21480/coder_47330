import Router from 'express';
import MessageManager from '../../dao/messageManager.js';
const router = Router();

router.get('/message', async (req, res) => {
    const { query = {} } = req;
    const msg = await MessageManager.get(query);
    res.render('mesagges', { msg: msg.map(s => s.toJSON()) });

});

router.post('/message', async (req, res) => {
    const { body } = req;
    const product = await MessageManager.create(body);
    res.status(201).send(product);
});

export default router;