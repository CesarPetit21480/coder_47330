// import cartDTO from '../dto/cartDTO.dto';

export default class Reject {

    constructor(dao) {
        this.dao = dao;
    }
    async get() {
        const cart = await this.dao.get();
        return cart;
    }
 
    async create(data) {
        const cart = await this.dao.create(data);
        return cart;
    }


    async deleteById(rid) {
        const cart = await this.dao.deleteById(rid);
        return cart;
    }

    async getActive() {
        const reject = await this.dao.getActive();

        if (!reject) {
            return 0;
        }
        return reject;
    }    
    async updateById(sid, pid) {
        const cart = await this.dao.updateById(sid, pid);   
        return cart;
    }



}



