import ProductDao from '../dao/product.dao.js';
import { productRepository } from '../repositories/index.js';
import { InvalidDataException, NotFoundException } from '../utils/util.js';


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

    static async deleteById(pid, email,role) {

        const product = await productRepository.getById(pid);

        if (!product) {

            throw new NotFoundException(`product not exists ${pid} 😱`);
        }
        

        if (product.owner === email || product.owner === "ADMIN" || role === "ADMIN") {
            await productRepository.deleteById(pid);
        } else {
            throw new InvalidDataException(`el producto que quiere eliminar no pertenece al usuario o no tiene permisos para eliminar  ${email}' 😱`);
        }

    }
    static async isOWnerPremium(pid) {
        await productRepository.deleteById(pid);

    }



}




