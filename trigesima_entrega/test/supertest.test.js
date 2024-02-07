import supertest from "supertest";
import chai from "chai";

const expect = chai.expect;
const requester = supertest('http://localhost:8080')

describe('Ecommerce Cesar Petit', () => {
    describe('Test of user', () => {
        it('should create a new user', async function () {
            const UserMock = {
                first_name: 'Juan',
                last_name: 'Rojas',
                email: 'juan@gmail.com',
                age: 23,
                password: 'nueva',
                provider: 'user'
            }
            const { statusCode, ok, _body } = await requester.post('/api/user/register').send(UserMock);


            console.log('statusCode', statusCode);
            console.log('ok', ok);
            console.log('_body', _body);
        });
    });

});