import { Router } from "express";
import passport from "passport";
import { isSuperAdmin } from '../../utils/util.js';
import productsControllers from '../../controllers/products.controller.js';


const router = Router();

router.get('/products', passport.authenticate('jwt', { session: false }), async (req, res, next) => {

  const { page = 1, limit = 5, category, sort } = req.query; // sort: asc | desc
  const opts = { page, limit, sort: { price: sort || 'asc' } };
  const criteria = {};
  let esAdministrador = false;
  if (category) {
    criteria.category = category;
  }

  try {

    const product = await productsControllers.get(opts, criteria);

    let info = buildResponse({ ...product, category, sort });

    if (isSuperAdmin(req.user)) {
      esAdministrador = true;
    }

    info = { ...info, title: 'Productos En Stock', user: req.user, isAdministrator: esAdministrador }
    res.render('products', { info });

  } catch (error) {
    next(res.status(error.statusCode || 500).json({ message: error.message }));
  }
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

export default router;