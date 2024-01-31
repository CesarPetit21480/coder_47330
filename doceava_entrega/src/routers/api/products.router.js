import Router from 'express';
// import ProductManager from '../../dao/ProductManager.js';
import productsControllers from '../../controllers/products.controller.js';
import { authenticationMiddleware, authorizarionMiddeleware, generateProducts } from '../../utils/util.js';
import { generatorProductError, generatorProductIdError } from '../../utils/causeMessageError.js'
import EnumsError from '../../utils/enumError.js'
import { CustomError } from '../../utils/CustomError.js';
const router = Router();

router.get('/', async (req, res, next) => {

  const { page = 1, limit = 5, category, sort } = req.query; // sort: asc | desc
  const opts = { page, limit, sort: { price: sort || 'asc' } };
  const criteria = {};
  if (category) {
    criteria.category = category;
  }
  try {
    const product = await productsControllers.get(opts, criteria);
    res.status(200).json(buildResponse(product));

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
    prevLink: data.hasPrevPage ? `http://localhost:8080/api/products?limit=${data.limit}&page=${data.prevPage}${data.category ? `&category=${data.category}` : ''}${data.sort ? `&sort=${data.sort}` : ''}` : '',
    nextLink: data.hasNextPage ? `http://localhost:8080/api/products?limit=${data.limit}&page=${data.nextPage}${data.category ? `&category=${data.category}` : ''}${data.sort ? `&sort=${data.sort}` : ''}` : '',
  };
};

router.get('/:pid', async (req, res, next) => {
  try {
    const { params: { pid } } = req;

    const product = await productsControllers.getById(pid); 
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});


router.post('/', authenticationMiddleware('jwt'), authorizarionMiddeleware(["ADMIN"]), async (req, res, next) => {

  let esOwnerPremiun;

  try {
    const {
      title,
      description,
      price,
      code,
      stock,
      category,
      thumbnails,
      owner = undefined,
    } = req.body;


    const producto = {
      title,
      description,
      price,
      code,
      stock,
      category,
      thumbnails,
      owner
    }

    if (producto.owner)
      esOwnerPremiun = await productsControllers.isOWnerPremium(producto.owner)

    if (
      !title ||
      !description ||
      !price ||
      !code ||
      !stock ||
      !category ||
      !thumbnails

    ) {
      CustomError.createError({
        name: 'Error creando el producto',
        cause: generatorProductError({
          title,
          description,
          price,
          code,
          stock,
          category,
          thumbnails
        }),
        message: 'Ocurrio un error mientras intentamos generar un producto.',
        code: EnumsError.BAD_REQUEST_ERROR,
      });
    }
    const product = await productsControllers.create(producto);
    res.status(201).send(product);

  } catch (error) {
    next(error);
  }
});

router.put('/:pid', authenticationMiddleware('jwt'), authorizarionMiddeleware(["ADMIN"]), async (req, res, next) => {
  try {
    const { params: { pid }, body } = req;

    if (!pid) {

      CustomError.createError({
        name: 'Error Update Prodcut',
        cause: generatorProductIdError({
          pid
        }),
        message: 'Ocurrio un error mientras intentamos Actualizar un producto.',
        code: EnumsError.INVALID_PARAMS_ERROR,
      });
    }


    await productsControllers.updateById(pid, body);
    res.status(204).end()

  } catch (error) {
    next(res.status(error.statusCode || 500).json({ message: error.message }));
  }
});
router.delete('/:pid', authenticationMiddleware('jwt'), authorizarionMiddeleware(["ADMIN", "PREMIUM"]), async (req, res, next) => {
  try {
    const { params: { pid } } = req;
    const email = req.user.email;
    const role = req.user.role;
    await productsControllers.deleteById(pid, email, role);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.get('/mokingProducts', (req, res, next) => {
  try {
    const products = generateProducts();
    res.status(201).send(products);

  } catch (error) {
    next(res.status(error.statusCode || 500).json({ message: error.message }));
  }
});



export default router;  