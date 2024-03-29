import UserDao from '../dao/user.dao.js'
import { createHash, isValidPassword } from '../utils/util.js'
import { userRepository } from '../repositories/index.js'
import { InvalidDataException, NotFoundException } from '../utils/util.js';



export default class UsersServicies {

    static async create(data, email, password) {

        let user = await userRepository.getbyLogin(email);
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

    static async getByLogin(email) {


        let user = await userRepository.getbyLogin(email);
        if (!user) {
            throw new Error('User not exists');
        }
        return user;
    }

    static async getByEmail(email) {
        let user = await userRepository.getbyEmail(email);
        if (!user) {
            throw new Error('User not exists');
        }
        return user;
    }

    static async deleteByid(email) {
        let user = await userRepository.deletebyId(email);
    }

    static async updateConnected(uid, fecha) {
        let user = await userRepository.updateConnected(uid, fecha);

        return user;
    }


    static async validatePassword(email, password, recoveryPassword) {

        let user = await userRepository.getbyLogin(email);
        if (!user) {
            throw new NotFoundException(`User not exists ${email} 😱`);
        }
        const isEqualPassword = isValidPassword(password, user);

        if (isEqualPassword) {
            throw new InvalidDataException(`Password is Equal to registered 😱`);
        }
        if (password !== recoveryPassword) {
            throw new InvalidDataException(`los password no coinciden' 😱`);
        }
        user.password = createHash(password);
        const userActualizado = userRepository.updatebyId(user);

        if (userActualizado)
            return true;
    }

    static async changesRole(uid, nuevoRole) {

        let user = await userRepository.getById(uid);
        if (!user) {
            throw new NotFoundException(`User not exists ${uid} 😱`);
        }

        if (!nuevoRole) {
            let role = user.role

            if (role.toUpperCase() === "USER")
                user.role = "PREMIUM";
            else if (role.toUpperCase() === "PREMIUM") {
                user.role = "USER";
            }
        }
        else {
            user.role = nuevoRole;
        }


        const userActualizado = userRepository.updatebyId(user);

        if (userActualizado)
            return true;
    }

    static async isOWnerPremium(email) {

        let user = await this.getByEmail(email);
        if (!user) {
            throw new NotFoundException(`User not exists ${uid} 😱`);
        }
        let role = user.role
        if (role.toUpperCase() !== "PREMIUM" && role.toUpperCase() !== "ADMIN")
            throw new InvalidDataException(`USER NOT IS PREMIUN OR ADMIN' 😱`);
    }

    static async getAll() {
        let users = await userRepository.getAll();
        if (!users) {
            throw new NotFoundException(`Users dababase empty`);
        }
        return users;
    }

    static async inactivesUsers() {
        let users = await userRepository.inactivesUsers();
        if (users.length === 0) {
            throw new NotFoundException(`Users dababase inactives empty`);
        }
        return users;
    }
}