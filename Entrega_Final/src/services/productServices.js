import ProductDao from '../dao/product.dao.js';
import { productRepository } from '../repositories/index.js';
import { InvalidDataException, NotFoundException } from '../utils/util.js';
import userServices from '../services/usersServices.js'
import EmailService from './emailServices.js';


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

    static async deleteById(pid, email, role) {

        const product = await productRepository.getById(pid);

        if (!product) {
            throw new NotFoundException(`product not exists ${pid} 😱`);
        }

        const user = userServices.getByEmail(product.owner);

        const esOwnerPremiun = (user.role === 'PREMIUN') ? true : false;

        if (product.owner === email || product.owner === "ADMIN" || role === "ADMIN") {

            await productRepository.deleteById(pid);
            if (esOwnerPremiun) {
                const emailService = EmailService.getInstance();
                await emailService.senNotificacionOwnerProductEmail(user.email, product);
            }
        } else {
            throw new InvalidDataException(`el producto que quiere eliminar no pertenece al usuario o no tiene permisos para eliminar  ${email}' 😱`);
        }

    }
    static async isOWnerPremium(pid) {
        await productRepository.deleteById(pid);
    }
}




