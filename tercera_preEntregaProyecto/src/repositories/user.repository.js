import UserDTO from "../dto/userDTO.js";
export default class user {

    constructor(dao) {
        this.dao = dao;
    }
    async get(email) {
        const user = await this.dao.get(email);
        const userMapping = new UserDTO(user)
        return user;

       
    }
    async create(data) {
        const user = await this.dao.create(data);
        return user;
    }

    async getById(uid) {
        const user = await this.dao.getById(uid);
        return user;
    }
}


