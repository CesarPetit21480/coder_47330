import rejectServices from "../services/rejectServices.js";


export default class RejectController {

    static async createReject(data) {
        const carrito = await rejectServices.createReject(data);
        return carrito;
    }

    static async getActive() {
        const reject = await rejectServices.getActive();
        const rejectMapping = (reject) ? reject.toJSON() : 0;
        return rejectMapping;
    }

    static async updateById(rid, pid) {
        const reject = await rejectServices.updateById(rid, pid);
        return reject;
    }

}
