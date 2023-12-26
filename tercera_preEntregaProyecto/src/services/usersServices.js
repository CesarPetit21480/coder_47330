import UserDao from '../dao/user.dao.js'
import { createHash, isValidPassword } from '../utils.js'
import {userRepository} from '../repositories/index.js'


export default class UsersServicies {

    static async create(data, email, password) {


        let user = await userRepository.get(email);
        if (user) {
            throw new Error('User already registered');
        }

        const newUser = {
            ...data,
            password: createHash(password)
        }

        user = await userRepository.create(newUser);
        console.log(`user created successfully ${user._id}`);
        return user;
    }

    static async getByid(uid) {
        let user = await userRepository.getById(uid);
        if (!user) {
            throw new Error('User not exists');
        }     
        return user;
    }

    
    static async getByEmail(email) {


        let user = await userRepository.get(email);
        if (!user) {
            throw new Error('User not exists');
        }     
        return user;
    }



}