import CartRepository from './cart.repository.js';
import ProductRepository from './product.repository.js';
import UserRepository from './user.repository.js';
import { userDao, productDao, cartDao } from '../dao/factory.js';

export const cartRepository = new CartRepository(new cartDao());
export const userRepository = new UserRepository(new userDao());
export const productRepository = new ProductRepository(new productDao());

