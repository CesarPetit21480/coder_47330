import UserModel from '../models/user.model.js'

export default class UserDao {

    async create(data) {
        const newUser = await UserModel.create(data);
        return newUser;
    }
    async get(email) {
        let user;
        try {
            user = await UserModel.findOne({ email });
        } catch (error) {
            throw new Error(error.message);
        }

        return user;
    }


    async get_array(parametro) {
        let user;
        try {
            user = await UserModel.find(parametro);
        } catch (error) {
            throw new Error(error.message);
        }

        return user;
    }


    async getById(uid) {
        const user = await UserModel.findById(uid);
        return user;
    }

    async update(id, doc) {
        return UserModel.findByIdAndUpdate(id, { $set: doc })
    }


    async updateById(uuid, user) {
        const userExists = UserModel.findById(uuid);
        if (!userExists) {
            logMessage(`user not exists`, "fatal");
        }
        const criteria = { _id: uuid };
        const operation = { $set: user }
        const userdb = await UserModel.updateOne(criteria, operation);
        return userdb;
    }

    async deleteById(uid) {
        const user = await UserModel.findById(uid);
        if (!user) {
            throw new Exception('No existe el Usuario 😨', 404);
        }
        const criteria = { _id: uid };
        await UserModel.deleteOne(criteria);
       
    }
}