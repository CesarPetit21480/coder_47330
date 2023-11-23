import { Router } from "express";
import ProductManager from "../../dao/ProductManager.js";
import { privateRouter } from "../../utils.js";
import { jwtAuth, isSuperAdmin, authenticationMiddleware, authorizarionMiddeleware } from '../../utils.js';



const router = Router();


// router.get('/products', privateRouter, (req, res) => {
//   res.render('products', { title: 'Perfil', user: req.session.user });
// });



// router.get('/products', privateRouter, (req, res) => {
//   res.render('products', { title: 'Productos En Stock', user: req.session.user });
// });

router.get('/products', authenticationMiddleware('jwt'), authorizarionMiddeleware(['regular,seller', 'admin']), async (req, res) => {

  const { page = 1, limit = 5, category, sort } = req.query; // sort: asc | desc
  const opts = { page, limit, sort: { price: sort || 'asc' } };
  const criteria = {};
  let esAdministrador = false;
  if (category) {
    criteria.category = category;
  }
  const product = await ProductManager.get(opts, criteria);

  let info = buildResponse({ ...product, category, sort });


  if (isSuperAdmin(req.user)) {
    esAdministrador = true;
  }

  info = { ...info, title: 'Productos En Stock', user: req.user, isAdministrator: esAdministrador }
  res.render('products', { info });

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