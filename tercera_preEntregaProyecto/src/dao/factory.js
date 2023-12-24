import config from "../config/config.js";


export let cartDao;
export let productDao;
export let userDao;

switch (config.persistence) {

    case 'mongodb':
        cartDao = (await import('./cart.dao.js')).default;
        productDao = (await import('./product.dao.js')).default;
        userDao = (await import('./user.dao.js')).default;
        break;
    default:
        cartDao = undefined;
        productDao = undefined;
        userDao = undefined;
}
