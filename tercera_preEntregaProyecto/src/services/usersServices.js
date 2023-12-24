import UserDao from '../dao/user.dao.js'
import { createHash, isValidPassword } from '../utils.js'


export default class UsersServicies {

    static async create(data, email, password) {


        let user = await UserDao.get(email);
        if (user) {
            throw new Error('User already registered');
        }

        const newUser = {
            ...data,
            password: createHash(password)
        }

        user = await UserDao.create(newUser);
        console.log(`user created successfully ${user._id}`);
        return user;
    }


}