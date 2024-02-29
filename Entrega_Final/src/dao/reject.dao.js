import rejectModel from "../models/rejectCart.model.js";
import { Exception } from '../utils/util.js';
import mongoose from "mongoose";
import { logMessage } from '../config/logger.js';


export default class CartDao {

    get() {
        return rejectModel.find();
    }
    async getById(rid) {
        const reject = await rejectModel.findById(rid);
        if (!reject) {
            logMessage(`Couldn't find Reject Reject Model 😒`, "fatal");
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
        logMessage("Reject creado correctamente 🚀🚀", "info");
        return message;
    }

    async updateById(rid, pid) {

        const rejectCart = await rejectModel.findOne({ _id: rid });
        if (!rejectCart) {
            logMessage(`Couldn't find Reject 😒`, "fatal");
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
        logMessage('REJECT eliminado correctamente 😑', "info");

    }

}