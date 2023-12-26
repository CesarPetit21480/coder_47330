


export default class Product {

    constructor(dao) {
        this.dao = dao;
    }

    async get(opts, criteria) {
        const product = await this.dao.get(opts, criteria);
        return product;
    }
    async getById(pid) {
        const product = await this.dao.getById(pid);
        return product;
    }
    async create(data) {
        const product = await this.dao.create(data);
        return product;
    }
    async updateById(pid,data) {
        const product = await this.dao.updateById(pid,data);
        return product;
    }

    async deleteById(pid) {
        const product = await this.dao.deleteById(pid);
        return product;
    }
}
