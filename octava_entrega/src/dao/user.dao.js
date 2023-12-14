import UserModel from '../models/user.model.js'


export default class UserDao {

    static async create(data) {
        const newUser =  await UserModel.create(data);
        return newUser;
    }
    static async get(email) {
        const user = await UserModel.findOne({ email });
        return user;
    }
}