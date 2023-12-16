import cartDao from "../dao/cart.dao.js";


export default class CartServices {


    static async get() {
        const carrito = await cartDao.get();
        return carrito;
    }

    static async getActive() {
        const carrito = await cartDao.getActive();
        return carrito;
    }

    static async getById(cid) {
        const carrito = await cartDao.getById(cid);
        return carrito;
    }

    static async updateById(cid, pid, quantity) {
        const carrito = await cartDao.updateById(cid, pid, quantity);
        return carrito;
    }

    static async create(data) {
        const carrito = cartDao.create(data);

    }
    static async deleteProductCartByid(cid, pid) {
        const carrito = await cartDao.deleteProductCartByid(cid, pid);

    }

    static async deleteProductCart(cid, pid) {
        const carrito = await cartDao.deleteProductCart(cid, pid);
        return carrito;
    }

    static async deleteCart(cid) {
        await cartDao.deleteById(cid);
    } 
}