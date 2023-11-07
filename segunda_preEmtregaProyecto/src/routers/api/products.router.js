import Router from 'express';
import ProductManager from '../../dao/ProductManager.js';
const router = Router();

router.get('/products', async (req, res) => {
  const { page = 1, limit = 10, sort = 1, field, valueField } = req.query;

  const query = {
    page,
    limit,
    sort,  
    field,
    valueField
  }
  const product = await ProductManager.get(query);
  res.status(200).json(product);
});

router.get('/products/:sid', async (req, res) => {
  try {
    const { params: { sid } } = req;
    const student = await ProductManager.getById(sid);
    res.status(200).json(student);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

router.get('/products', async (req, res) => {
  const { query = {} } = req;
  const product = await ProductManager.get(query);
  res.status(200).json(product);
});

router.post('/products', async (req, res) => {
  const { body } = req;
  const product = await ProductManager.create(body);
  res.status(201).send(product);
});

router.put('/products/:sid', async (req, res) => {
  try {
    const { params: { sid }, body } = req;
    await ProductManager.updateById(sid, body);
    res.status(204).end();
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});
router.delete('/products/:sid', async (req, res) => {
  try {
    const { params: { sid } } = req;
    await ProductManager.deleteById(sid);
    res.status(204).end();
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

export default router;