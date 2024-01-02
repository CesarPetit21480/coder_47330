import purchaseModel from "../models/purchase.model.js";


export default class PurchaseDao {

    async create(data) {
        const purchase = await purchaseModel.create(data);
        return purchase;
    }

    async get() {

        const purchase = await purchaseModel.find();
        return purchase;
    }



}