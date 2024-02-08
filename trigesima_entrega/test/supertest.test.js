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
            expect(statusCode).to.be.equal(200);
            expect(ok).to.be.ok;
            expect(_body).to.be.has.property('payload');
            expect(_body.payload).to.have.property('_id');
            expect(_body.payload).to.have.property('age', 23);

        });

        it('Dede responder un 400 cuando falta algun dato de usuario', async function () {
            const UserMock = {
                first_name: 'Juan',
                last_name: 'Rojas',
                email: 'juan1@gmail.com',
                age: 23,
                provider: 'user'
            }
            const { statusCode, ok, _body } = await requester.post('/api/user/register').send(UserMock);

            console.log('statusCode: ', statusCode);
            console.log('ok: ', ok);
            console.log('_body: ', _body);

            expect(statusCode).to.be.equal(302);
            expect(ok).to.be.not.ok;


        });
    });

});