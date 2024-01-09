import { Router } from 'express';
import MessageManager from '../../dao/messageManager.js';
import { authenticationMiddleware, authorizarionMiddeleware } from '../../utils/util.js';

const router = Router();

router.get('/message', async (req, res) => {
    const { query = {} } = req;
    const msg = await MessageManager.get(query);

    //   res.render('mesagges', { msg: msg.map(s => s.toJSON()) });

    res.render('messages', { msg: msg.map(s => s.toJSON()) });

});

router.post('/message', authenticationMiddleware('jwt'), authorizarionMiddeleware(["USER"]), async (req, res, next) => {
    const { body } = req;

    try {
        const message = await MessageManager.create(body);
        const msg = await MessageManager.get(); { }
        res.render('messages', { msg: msg.map(s => s.toJSON()) })

    } catch (error) {
        next(res.status(error.statusCode || 500).json({ message: error.message }));
    }

});

export default router;