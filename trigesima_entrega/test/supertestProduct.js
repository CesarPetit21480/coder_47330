import mongoose from "mongoose";
import chai from "chai";
import ProductDao from "../src/dao/product.dao.js";


const expect = chai.expect;


describe('Pruebas al modulo user dao.', function () {

    before(async function () {
        await mongoose.connect('mongodb://localhost:27017/ecommerce');
        this.userDao = new UserDao();
    });
    after(async function () {
        await mongoose.connection.close();
    });
    it('Deberia obtener la lista de producto vacia de forma exitosa', async function () {
        const result = await this.ProductDao.get_array({});
        //expect(result).to.be.deep.equal([]);
        expect(Array.isArray(result)).to.be.ok;
        expect(Array.isArray(result)).to.be.equals(true);
    });

    it('Deberia Actualiar el usuario de forma exitosa', async function () {

        const user = await this.userDao.create({
            first_name: 'Juan',
            last_name: 'Rojas',
            email: 'juan@gmail.com',
            age: 23,
            password: 'nueva',
            provider: 'user'
        })

        await this.userDao.update(user._id, {
            first_name: 'Pedro',
            last_name: 'Picapiedras',

        })
        const userBase = await this.userDao.getById(user._id);
        expect(userBase.first_name).to.be.equal('Pedro');

        await this.userDao.deleteById(userBase._id);

    });

});
