import request from 'supertest';

import app from '../../src/app';
import { password } from '../../src/database/database';
import User from '../../src/models/User';
describe('User authentication', () => {


    it('should authenticate with valid credentials', async () => {
        const user = await User.create({
            name: "TestUser",
            email: "test@mail.com",
            password: "123"
        });

        const response = await request(app)
            .post("/login")
            .send({
                email: user.email,
                password: user.password
            });

        expect(response.status).toBe(200);
    });


});