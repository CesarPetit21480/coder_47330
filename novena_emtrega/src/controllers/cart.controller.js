import cartServices from "../services/cartServices.js";
import { Exception } from '../utils.js';

export default class CartController {

    static async get() {
        const cart = await cartServices.get();
        const carrMapping = cart.map(s => s.toJSON());
        return carrMapping;
    }
    static async getActive() {
        const carrito = await cartServices.getActive();
        const carrMapping = (carrito) ? carrito.toJSON() : 0;
        return carrMapping;
    }
    static async getById(cid) {
        const carrito = await cartServices.getById(cid);
        return carrito;
    }

    static async updateById(cid, pid, quantity) {
        const carrito = await cartServices.updateById(cid, pid, quantity);
        return carrito;
    }

    static async create(data) {
        const carrito = await cartServices.create(data);
        return carrito;
    }


    static async deleteProductCartByid(cid,pid) {
        const carrito = await cartServices.deleteProductCartByid(cid, pid);
        return carrito;
    }

    static async deleteProductCart(cid, pid) {
        const carrito = await cartServices.deleteProductCart(cid, pid);
        return carrito;
    }

    static async deleteCart(cid) {
        await cartServices.deleteCart(cid);
    }

    static async verificarStock (pid,quantity){
        const hayStock = await cartServices.verificarStock(pid,quantity);
        return hayStock;
    }


}