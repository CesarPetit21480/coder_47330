import ProductDao from '../dao/product.dao.js';
import { productRepository } from '../repositories/index.js';


export default class ProductServices {

    static async get(opts, criteria) {

        const product = await productRepository.get(opts, criteria);
        return product;
    }
    static async getById(pid) {

        const product = await productRepository.getById(pid);
        return product;
    }

    static async updateById(pid, data) {

        const product = await productRepository.updateById(pid, data);
        return product;
    }


    static async create(data) {

        const product = await productRepository.create(data);
        return product;
    }

    static async deleteById(pid) {
        await productRepository.deleteById(pid);

    }


}




