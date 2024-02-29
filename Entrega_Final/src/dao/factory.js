import config from "../config/config.js";


export let cartDao;
export let productDao;
export let userDao;
export let rejectDao;
export let purchaseDao
switch (config.persistence) {

    case 'mongodb':
        cartDao = (await import('./cart.dao.js')).default;
        productDao = (await import('./product.dao.js')).default;
        userDao = (await import('./user.dao.js')).default;
        rejectDao = (await import('./reject.dao.js')).default;
        
        purchaseDao = (await import('./purchase.dao.js')).default;
        break;
    default:
        cartDao = undefined;
        productDao = undefined;
        userDao = undefined;
        rejectDao = undefined
        purchaseDao = undefined
}
