import ProductServices from '../services/productServices.js';


export default class ProductController {

    static async get(opts, criteria) {

        const products = await ProductServices.get(opts, criteria);

        if (!products) {
            throw new Error('Not Exists Product');
        }
        return products;
    }

    static async getById(pid) {

        const products = await ProductServices.getById(pid);

        if (!products) {
            throw new Error('Not Exists Product');
        }
        return products;
    }

    static async updateById(pid, data) {

        const products = await ProductServices.updateById(pid, data);

        if (!products) {
            throw new Error('Not Exists Product');
        }
        return products;
    }

    static async create(data) {

        const product = await ProductServices.create(data);
        return product;
    }

    static async deleteById(pid) {

        await ProductServices.deleteById(pid);
   }

}


