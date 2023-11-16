import { Router } from "express";
import ProductManager from "../../dao/ProductManager.js";
import { privateRouter } from "../../utils.js";



const router = Router();


// router.get('/products', privateRouter, (req, res) => {
//   res.render('products', { title: 'Perfil', user: req.session.user });
// });



// router.get('/products', privateRouter, (req, res) => {
//   res.render('products', { title: 'Productos En Stock', user: req.session.user });
// });

router.get('/products', privateRouter, async (req, res) => {

  const { page = 1, limit = 5, category, sort } = req.query; // sort: asc | desc
  const opts = { page, limit, sort: { price: sort || 'asc' } };
  const criteria = {};
  if (category) {
    criteria.category = category;
  }
  const product = await ProductManager.get(opts, criteria);

  let info = buildResponse({ ...product, category, sort });
  let esAdministrador;
  if (req.session.user.rol) {
    esAdministrador = req.session.user.rol
  }
  console.log(esAdministrador);


  info = { ...info, title: 'Productos En Stock', user: req.session.user, isAdministrator: esAdministrador }



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