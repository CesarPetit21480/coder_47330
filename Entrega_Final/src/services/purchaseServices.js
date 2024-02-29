import { purchaseRepository } from "../repositories/index.js";

export default class PurchaseServices {

    static async create(data) {
        const ticket = await purchaseRepository.create(data);
        return ticket;
    }

    
    static async get() {
        const ticket = await purchaseRepository.get();
        return ticket;
    }






}
