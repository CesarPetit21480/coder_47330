import { logMessage } from "../config/logger.js";
import ProductModel from "../models/product.model.js";
import { Exception } from '../utils/util.js';


export default class ProductDao {


    async get(opts = {}, criteria = {},) {

        const result = await ProductModel.paginate(criteria, opts);
        return result;
    }
    async getById(pid) {
        const product = await ProductModel.findById(pid);
        if (!product) {
            logMessage(`Couldn't find products 😒`, "fatal");
        }
        return product;
    }

    async create(data) {
        const product = await ProductModel.create(data);
        logMessage('Producto creado correctamente 🚀🚀', "info");
        return product;
    }


    async updateById(pid, data) {
        const product = ProductModel.findById(pid);
        if (!product) {
            logMessage(`Couldn't find products 😒`, "fatal");
        }
        const criteria = { _id: pid };
        const operation = { $set: data }
        await ProductModel.updateOne(criteria, operation);
        return product;
    }

    async deleteById(sid) {
        const product = await ProductModel.findById(sid);
        if (!product) {
            throw new Exception('No existe el Producto 😨', 404);
        }
        const criteria = { _id: sid };
        await ProductModel.deleteOne(criteria);
        console.log('Producto eliminado correctamente 😑');
    }

}