
export default class Purchase{

    constructor(dao) {
        this.dao = dao;
    }

    async create(data) {
        const ticket = await this.dao.create(data);
        return ticket;
    }

    async get() {
        const ticket = await this.dao.get();
        return ticket;
    }
    


} 