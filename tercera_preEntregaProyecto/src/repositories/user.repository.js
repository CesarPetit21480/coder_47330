import UserDTO from "../dto/userDTO.js";
export default class user {

    constructor(dao) {
        this.dao = dao;
    }
    async get(email) {
        const user = await this.dao.get(email);
        console.log(user);
        return user.map(user => new UserDTO(user));
    }
    async create(data) {
        const user = await this.dao.create(data);
        return user;
    }
}


