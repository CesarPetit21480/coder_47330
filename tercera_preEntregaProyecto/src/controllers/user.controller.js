import UserServices from '../services/usersServices.js';


export default class UserController {

    static async create(data, email, password) {

        const user = await UserServices.create(data, email, password);
        console.log("user created successfully");
        return user;
    }
}