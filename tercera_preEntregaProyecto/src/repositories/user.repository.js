import UserLoginDTO from "../dto/user_login.DTO.js";
import UserDTO from "../dto/userDTO.js";
export default class user {

    constructor(dao) {
        this.dao = dao;
    }
    async getbyLogin(email) {
        const user = await this.dao.get(email);

        if (user) {
            return user;
        }
        return null;

    }


    async getbyEmail(email) {
        const user = await this.dao.get(email);

        if (user) {
            const userMapping = new UserDTO(user)
            return userMapping;
        }
        return null;


    }
    async create(data) {
        const user = await this.dao.create(data);
        return user;
    }

    async getById(uid) {
        const user = await this.dao.getById(uid);

        if (user)
            return user;
        return null;

    }
}


