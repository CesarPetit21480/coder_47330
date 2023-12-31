
export default class Purchase{

    async create(data) {
        const ticket = await this.dao.create(data);
        return ticket;
    }


} 