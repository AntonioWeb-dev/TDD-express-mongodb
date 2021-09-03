import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../src/app';
import dotenv from 'dotenv';
dotenv.config();

describe('Test users routes', () => {
  let connection: any;
  beforeAll(async () => {
    connection = await mongoose.connect(`${process.env.DB_URI}`);
  });
  it('should get users route', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        name: 'UserTest',
        email: 'test@gmail.com',
        age: 56,
      });
    console.log(res);
    expect(res.body.email).toBe('test@gmail.com');
    mongoose.connection.close();
  })
})
