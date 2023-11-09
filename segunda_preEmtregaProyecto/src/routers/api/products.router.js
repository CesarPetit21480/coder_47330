import Router from 'express';
import ProductManager from '../../dao/ProductManager.js';
const router = Router();

router.get('/products', async (req, res) => {

  const { page = 1, limit = 5, category, sort } = req.query; // sort: asc | desc
  const opts = { page, limit, sort: { price: sort || 'asc' } };
  const criteria = {};
  if (category) {
    criteria.category = category;
  }
  const product = await ProductManager.get(opts,criteria);
  res.status(200).json(buildResponse(product));
});

const buildResponse = (data) => {
  return {
    status: 'success',
    payload: data.docs.map(product => product.toJSON()),
    totalPages: data.totalPages,
    prevPage: data.prevPage,
    nextPage: data.nextPage,
    page: data.page,
    hasPrevPage: data.hasPrevPage,
    hasNextPage: data.hasNextPage,
    prevLink: data.hasPrevPage ? `http://localhost:8080/products?limit=${data.limit}&page=${data.prevPage}${data.category ? `&category=${data.category}` : ''}${data.sort ? `&sort=${data.sort}` : ''}` : '',
    nextLink: data.hasNextPage ? `http://localhost:8080/products?limit=${data.limit}&page=${data.nextPage}${data.category ? `&category=${data.category}` : ''}${data.sort ? `&sort=${data.sort}` : ''}` : '',
  };
};


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