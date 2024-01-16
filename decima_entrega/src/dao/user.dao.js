import UserModel from '../models/user.model.js'


export default class UserDao {

     async create(data) {
        const newUser =  await UserModel.create(data);
        return newUser;
    }
     async get(email) {
        const user = await UserModel.findOne({ email });
        return user;
    }

     async getById(uid) {
        const user = await UserModel.findById(uid);
        return user;
    }
}