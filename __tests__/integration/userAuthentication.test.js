import request from 'supertest';

import app from '../../src/app';

import User from '../../src/models/User';
/*eslint-disable */
describe('User authentication', () => {
  it('should authenticate with valid credentials', async () => {
    const user = await User.create({
      name: 'TestUser',
      email: 'test@mail.com',
      password: '123',
    });

    const response = await request(app).post('/login').send({
      email: user.email,
      password: user.password,
    });

    expect(response.status).toBe(200);
  });

  it('should not authenticate with invalid credentials', async () => {
    const user = await User.create({
      name: 'TestUser',
      email: 'test2@mail.com',
      password: '1234',
    });

    const response = await request(app).post('/login').send({
      email: user.email,
      password: '321',
    });

    expect(response.status).toBe(400);
  });

  it('should return jwt token when autheticated', async () => {
    const user = await User.create({
      name: 'TestUser',
      email: 'test3@mail.com',
      password: '1234',
    });

    const response = await request(app).post('/login').send({
      email: user.email,
      password: user.password,
    });

    expect(response.body).toHaveProperty('token');
  });
});
