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

    async getAll() {
        let users;
        try {
            users = await UserModel.find();
        } catch (error) {
            throw new Error(error.message);
        }
        return users;
    }

    async updateConnected(uid, fecha) {
        let users;
        try {
            const user = await UserModel.findById(uid);
            user.connectedTo = fecha;
            await user.save();
        } catch (error) {
            throw new Error(error.message);
        }
        return users;
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

    async get_search(parametro) {
        let user;
        try {
            user = await UserModel.find(parametro);
        } catch (error) {
            throw new Error(error.message);
        }

        return user;
    }

    async getByInactive() {

        const dosDiasAnteriores = new Date();
        dosDiasAnteriores.setDate(dosDiasAnteriores.getDate() - 1);
        const formattedDate = dosDiasAnteriores.toISOString();
        const userPorFecha = await UserModel.find({ connectedTo: { $lt: formattedDate } });
        return userPorFecha;
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