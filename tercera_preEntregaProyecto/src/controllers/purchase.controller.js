import PurchaseServices from "../services/purchaseServices.js";


export default class PurchaseController {

    static async create(data) {
        const ticket = await PurchaseServices.create(data);
        return ticket;
    }


    static async get() {
        const ticket = await PurchaseServices.get();
        const ticketMapping = ticket.map(t => t.toJSON());
        return ticketMapping;
    }





}