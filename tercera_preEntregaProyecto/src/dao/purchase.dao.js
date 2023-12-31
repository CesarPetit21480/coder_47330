import purchaseModel from "../models/purchase.model.js";
import { Exception } from '../utils.js';
import mongoose from "mongoose";

export default class PurchaseDao {
   

    async create(data) {
        const purchase = await purchaseModel.create(data);
        console.log('ticket creado correctamente 🚀🚀');
        return purchase;
    }

    
}