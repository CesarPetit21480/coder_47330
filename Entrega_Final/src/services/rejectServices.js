
import { rejectRepository } from "../repositories/index.js";
export default class RejectServices {

    static async createReject(data) {
        const reject = await rejectRepository.create(data);
    }

    static async getActive() {
        const reject = await rejectRepository.getActive();
        return reject;
    }

    static async updateById(rid, pid) {
        const carrito = await rejectRepository.updateById(rid, pid);
        return carrito;
    }



}