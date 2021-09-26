import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../src/app';
import dotenv from 'dotenv';
dotenv.config();

describe('Test users routes ', () => {
  let connection: any;
  beforeAll(async () => {
    connection = await mongoose.connect(`${process.env.DB_URI}`);
  });
  let userId: string;
  it('should POST an user route POST-/users', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        body: JSON.stringify({
          name: 'UserTest',
          email: 'test@gmail.com',
          age: 56,
        })
      });
    expect(res.body.email).toBe('test@gmail.com');
    userId = res.body._id;
  });

  it('should get users route GET-/users', async () => {
    const res = await request(app)
      .get('/users')
    expect(res.status).toBe(200);
  });

  it('should update users name PUT-/users/:id', async () => {
    const res = await request(app)
      .put(`/users/${userId}`)
      .send({
        name: 'tryUpdate'
      })
    expect(res.body.name).toBe('tryUpdate');
  });
  it('should delete an user name DELETE-/users/:id', async () => {
    const res = await request(app)
      .delete(`/users/${userId}`)
    expect(res.body._id).toBe(userId);
    mongoose.connection.close();
  });


})
