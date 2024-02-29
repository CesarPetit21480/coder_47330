import purchaseModel from "../models/purchase.model.js";


export default class PurchaseDao {

    async create(data) {
        const purchase = await purchaseModel.create(data);
        return purchase;
    }

    async get() {

        const purchase = await purchaseModel.find()
        .populate('cart.cart')  // Poblar la referencia 'cart.cart'
        .populate('user.user');  // Poblar la referencia 'user.user'
  

    
        return purchase;
    }



}