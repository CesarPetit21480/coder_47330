import { cartRepository, purchaseRepository,productRepository } from "../repositories/index.js";

export default class CartServices {


    static async get() {
        const carrito = await cartRepository.get();
        return carrito;
    }

    static async getActive() {
        const carrito = cartRepository.getActive();
        return carrito;
    }

    static async getById(cid) {
        const carrito = await cartRepository.getById(cid);
        return carrito;
    }

    static async updateById(cid, pid, quantity) {
        const carrito = await cartRepository.updateById(cid, pid, quantity);
        return carrito;
    }

    static async create(data) {
        const carrito = await cartRepository.create(data);
    }
 
    static async deleteProductCartByid(cid, pid) {
        const carrito = await cartRepository.deleteProductCartByid(cid, pid);

    }

    static async deleteProductCart(cid, pid) {
        const carrito = await cartRepository.deleteProductCart(cid, pid);
        return carrito;
    }

    static async deleteCart(cid) {
        await cartRepository.deleteById(cid);
    }

    static async verificarStock(pid, quantity) {
        const product = await productRepository.getById(pid);

        let hayStock = false;
        if (product.stock >= quantity) {
            hayStock = true;
        }

        return hayStock;
    }
}