import { cartRepository } from "../repositories/index.js";


export default class CartServices {


    static async get() {
        const carrito = await cartRepository.get();
        return carrito;
    }

    static getActive() {
        const carrito = cartRepository.getActive();
        return carrito;
    }

    static getById(cid) {
        const carrito = cartRepository.getById(cid);
        return carrito;
    }

    static updateById(cid, pid, quantity) {
        const carrito = cartRepository.updateById(cid, pid, quantity);
        return carrito;
    }

    static create(data) {
        const carrito = cartRepository.create(data);

    }
    static async deleteProductCartByid(cid, pid) {
        const carrito = cartRepository.deleteProductCartByid(cid, pid);

    }

    static deleteProductCart(cid, pid) {
        const carrito = cartRepository.deleteProductCart(cid, pid);
        return carrito;
    }

    static deleteCart(cid) {
        cartRepository.deleteById(cid);
    }
}