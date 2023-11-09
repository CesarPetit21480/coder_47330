import cartModel from "../models/cart.model.js";
import { Exception } from '../utils.js';

export default class CartManager {


    static get() {
        return cartModel.find();
    }
    static async getById(sid) {
        const product = await cartModel.findById(sid);
        if (!product) {
            console.error(`Couldn't find Cart 😒`)
        }
        return product;
    }

    static async create(data) {

        const message = await cartModel.create(data);
        console.log('Cart creado correctamente 🚀🚀');
        return message;
    }

    static async updateById(sid, pid) {
        const cart = await cartModel.findOne({ _id: sid });
        if (!cart) {
            console.error(`Couldn't find cart 😒`)
        }
        cart.products.push({ product: pid });
        const result = await cartModel.updateOne({ _id: sid }, cart);
        console.log('result', result);
        return result;
    }

    static async deleteById(sid) {
        const cart = await cartModel.findById(sid);
        if (!product) {
            throw new Exception('No existe el Carrito 😨', 404);
        }
        const criteria = { _id: sid };
        await cartModel.deleteOne(criteria);
        console.log('Carrito eliminado correctamente 😑');
    }


    static async deleteProductCartByid(sid, pid) {
        try {
          const carritoActualizado = await cartModel.findByIdAndUpdate(sid, { $pull: { 'products': { product: pid } } })
          return carritoActualizado;
        } catch (error) {
        
            throw new Exception('no se pudo efectuar la operacion 😨', 404);
        }
        
    }


}