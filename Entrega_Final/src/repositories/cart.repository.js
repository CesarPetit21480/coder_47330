// import cartDTO from '../dto/cartDTO.dto';

export default class Cart {

    constructor(dao) {
        this.dao = dao;
    }
    async get() {
        const cart = await this.dao.get();
        return cart;
    }
    async getById(cid) {
        const carrito = await this.dao.getById(cid);
        return carrito;
    }

    async getActive() {
        const cart = await this.dao.getActive();

        if (!cart) {
            return 0;
        }
        return cart;
    }

    async create(data) {
        const cart = await this.dao.create(data);
        return cart;
    }

    async updateById(sid, pid, quantity) {
        const cart = await this.dao.updateById(sid, pid, quantity);   
        return cart;
    }

    async deleteById(sid) {
        const cart = await this.dao.deleteById(sid);
        return cart;
    }

    async deleteProductCartByid(sid, pid) {
        const carrito = await this.dao.deleteProductCartByid(sid, pid);
        return carrito;
    }

    async deleteProductCart(sid) {
        const carrito = await this.dao.deleteProductCart(sid);
        return carrito;
    }
}








