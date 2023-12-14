import cartDao from "../dao/cart.dao.js";


export default class CartServices {


    static async get() {
        const carrito = cartDao.get();
        return carrito;
    }

    static async getActive() {
        const carrito = await CartManager.getActive();
        return carrito;
    }

    static async getById(cid) {
        const carrito = await CartManager.getById(cid);
        return carrito;
    }



}