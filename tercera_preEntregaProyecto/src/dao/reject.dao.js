import rejectModel from "../models/rejectCart.model.js";
import { Exception } from '../utils.js';
import mongoose from "mongoose";

export default class CartDao {

    get() {
        return rejectModel.find();
    }
    async getById(rid) {
        const reject = await rejectModel.findById(rid);
        if (!reject) {
            console.error(`Couldn't find Reject Cart Model 😒`)
        }
        return reject;
    }

    async getActive() {

        const reject = await rejectModel.findOne({ status: true });

        if (!reject) {
            return 0;
        }
        return reject;
    }


    async create(data) {
        const message = await rejectModel.create(data);
        console.log('Reject creado correctamente 🚀🚀');
        return message;
    }

    async updateById(rid, pid) {

        const rejectCart = await rejectModel.findOne({ _id: rid });
        if (!rejectCart) {
            console.error(`Couldn't find Reject 😒`)
        }
        rejectCart.products.push({ product: pid });
        const result = rejectModel.updateOne({ _id: rid }, rejectCart);
        return result;


    }

    async deleteById(rid) {
        const cart = await rejectModel.findById(rid);
        if (!cart) {
            throw new Exception('No existe el REJECT 😨', 404);
        }
        const criteria = { _id: rid };
        await cartModel.deleteOne(criteria);
        console.log('REJECT eliminado correctamente 😑');
    }    

}