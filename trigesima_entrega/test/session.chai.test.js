import chai from 'chai';

import { createHash, isValidPassword } from '../src/utils/util.js';
import UserDTO from '../src/dto/User.dto.js';

const expect = chai.expect;

describe('Pruebas de utilidades (Session).', function () {
    it('Deberia hashear la contraseña de forma exitosa', async function () {
        const password = 'qwerty';
        const result = await createHash(password);
        expect(result).to.be.not.equals(password);
    });

    it('Deberia validar que la contraseña sea valida', async function () {
        const password = 'qwerty';
        const passwordHashed = await createHash(password);
        const user = { password: passwordHashed };
        const result = await isValidPassword(user, password);
        expect(result).to.be.ok;
    });

    it('Deberia crear el campo name a partir de first_name y last_name', function () {
        const user = {
            first_name: 'Cesar',
            last_name: 'Petit',
            role: 'admin',
            email: 'demo@mail.com',
        };
        const result = UserDTO.getUserTokenFrom(user);
        expect(result.name).to.be.equals('Cesar Petit');
    });
});