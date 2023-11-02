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
        console.log('Cart  creado correctamente 🚀🚀');
        return message;
    }  

    static async updateById(sid, data) {
        const cart = cartModel.findById(sid);
        if (!cart) {
            console.error(`Couldn't find cart 😒`)
        }
        const criteria = { _id: sid };
        const operation = { $set: data }
        await cartModel.updateOne(criteria, operation);
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


}
