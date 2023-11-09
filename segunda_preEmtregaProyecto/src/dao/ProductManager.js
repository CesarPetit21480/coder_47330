import ProductModel from "../models/product.model.js";
import { Exception } from '../utils.js';


export default class ProductManager {


    static async get(opts = {}, criteria = {},) {   

        const result = await ProductModel.paginate(criteria, opts);

        // console.log(queryObject);


        // const result = await ProductModel.find(queryObject)
        //     .limit(limit)
        //     .skip((page - 1) * limit)
        //     .sort({ price: sort })

        return result;
    }
    static async getById(sid) {
        const product = await ProductModel.findById(sid);
        if (!product) {
            console.error(`Couldn't find products 😒`)
        }
        return product;
    }

    static async create(data) {
        const product = await ProductModel.create(data);
        console.log('Producto creado correctamente 🚀🚀');
        return product;
    }


    static async updateById(sid, data) {
        const product = ProductModel.findById(sid);
        if (!product) {
            console.error(`Couldn't find product 😒`)
        }
        const criteria = { _id: sid };
        const operation = { $set: data }
        await ProductModel.updateOne(criteria, operation);
    }

    static async deleteById(sid) {
        const product = await ProductModel.findById(sid);
        if (!product) {
            throw new Exception('No existe el Producto 😨', 404);
        }
        const criteria = { _id: sid };
        await ProductModel.deleteOne(criteria);
        console.log('Producto eliminado correctamente 😑');
    }

}