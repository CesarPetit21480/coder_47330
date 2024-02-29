import CartRepository from './cart.repository.js';
import RejectRepository from './reject.repository.js';
import ProductRepository from './product.repository.js';
import PurchaseRepository from './purchase.repository.js';
import UserRepository from './user.repository.js';
import { userDao, productDao, cartDao, rejectDao, purchaseDao } from '../dao/factory.js';

export const cartRepository = new CartRepository(new cartDao());
export const userRepository = new UserRepository(new userDao());
export const productRepository = new ProductRepository(new productDao());
export const rejectRepository = new RejectRepository(new rejectDao());
export const purchaseRepository = new PurchaseRepository(new purchaseDao());




