import UserServices from '../services/usersServices.js';


export default class UserController {

    static async create(data, email, password) {

        const user = await UserServices.create(data, email, password);
        console.log("user created successfully");
        return user;
    }

    static async getByid(uid) {
        const user = await UserServices.getByid(uid);
        return user;
    }


    static async getByEmail(email) {
        const user = await UserServices.getByEmail(email);
        return user;
    }
}