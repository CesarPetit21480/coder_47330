import UserServices from '../services/usersServices.js';
import { logMessage } from '../config/logger.js';
import EmailService from '../services/emailServices.js';


export default class UserController {

    static async create(data, email, password) {

        const user = await UserServices.create(data, email, password);
        logMessage("user created successfully", "info");
        return user;
    }

    static async getByid(uid) {
        const user = await UserServices.getByid(uid);
        return user;
    }


    static async getByLogin(email) {
        const user = await UserServices.getByLogin(email);
        return user;
    }


    static async getByEmail(email) {
        const user = await UserServices.getByEmail(email);
        return user;
    }

    static async IsvalidatePassword(email, password, recoveryPassword) {
        return await UserServices.validatePassword(email, password, recoveryPassword);
    }
}
