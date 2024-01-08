import PurchaseServices from "../services/purchaseServices.js";
import PurchaseDto from '../dto/purchaseDTO.js';


export default class PurchaseController {

    static async create(data) {
        const ticket = await PurchaseServices.create(data);
        return ticket;
    }


    static async get() {
        const ticket = await PurchaseServices.get();
        const ticketMapping = ticket.map(t => t.toJSON());      
        if (ticketMapping) {
            const ticketDTO = new PurchaseDto(ticketMapping[0])
            return ticketDTO;
        }
        return undefined;
    }





}