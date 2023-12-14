import cartServices from "../services/cartServices.js";
import { Exception } from '../utils.js';

export default class CartController {


    static async get() {
        const carrito = cartServices.get();
        const carrMapping = carrito.map(s => s.toJSON());
        return carrMapping;
    }

    static async getActive() {
        const carrito = cartServices.getActive();
        const carrMapping = (carrito) ? carrito.toJSON() : 0;      
        return carrito;
    }


    static async getById(cid) {
        const carrito = cartServices.getById(cid);       
        return carrito;
    }




    





}