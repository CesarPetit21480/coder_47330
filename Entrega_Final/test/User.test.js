import mongoose from "mongoose";
import UserDao from "../src/dao/user.dao.js";
import Assert from 'assert';

const assert = Assert.strict;

describe('Pruebas al modulo user dao.', function () {

    before(async function () {
        await mongoose.connect('mongodb://localhost:27017/ecommerce');
        this.userDao = new UserDao();
    });
    after(async function () {
        await mongoose.connection.close();
    });

    it('Debe crear un Usuario de forma exitosa', async function () {

        const result = await this.userDao.create({
            first_name: 'Juan',
            last_name: 'Rojas',
            email: 'juan@gmail.com',
            age: 23,
            password: 'nueva',
            provider: 'user'
        })
        assert.ok(result._id);
        assert.strictEqual(result.email, 'juan@gmail.com');

        await this.userDao.deleteById(result._id);
    });

    it('Debe obtener por email un usuario de forma exitosa ', async function () {

        await this.userDao.create({
            first_name: 'Juan',
            last_name: 'Rojas',
            email: 'juan@gmail.com',
            age: 23,
            password: 'nueva',
            provider: 'user'
        })
        const results = await this.userDao.get_array({email:'juan@gmail.com'});
        console.log(results);
        assert.strictEqual(Array.isArray(results), true);
        assert.strictEqual(results.length, 1);
        assert.ok(results[0]._id);
        await this.userDao.deleteById(results[0]._id);



    })

});



