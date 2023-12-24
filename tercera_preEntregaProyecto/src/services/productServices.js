import ProductDao from '../dao/product.dao.js';


export default class ProductServices {

    static async get(opts, criteria) {

        const product = await ProductDao.get(opts, criteria);
        return product;
    }
    static async getById(pid) {

        const product = await ProductDao.getById(pid);
        return product;
    }

    static async updateById(pid) {

        const product = await ProductDao.updateById(pid,data);
        return product;
    }


    static async create(data) {

        const product = await ProductDao.create(data);
        return product;
    }

    static async deleteById(pid) {

        const product =   await ProductDao.deleteById(sid);
        return product;
    }

   
}




