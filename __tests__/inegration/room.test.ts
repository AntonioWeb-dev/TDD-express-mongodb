import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../src/app';
import dotenv from 'dotenv';
dotenv.config();

describe('Test rooms routes ', () => {
  let connection: any;
  beforeAll(async () => {
    connection = await mongoose.connect(`${process.env.DB_URI}`);
  });
  let roomId: string;
  // An user should be created before to use's id in this test
  test('should POST an user route POST-/rooms', async () => {
    const res = await request(app)
      .post('/rooms')
      .set({ ownerid: '6150e530d7ba43eda48a45a5' })
      .send({
        maxConnections: 5,
        name: 'Sala de fisica',
      });
    expect(res.body.maxConnections).toBe(5);
    roomId = res.body._id;
  });

  test('should get rooms route GET-/rooms', async () => {
    const res = await request(app)
      .get('/rooms')
    expect(res.status).toBe(200);
  });

  test('should update rooms name PUT-/rooms/:id', async () => {
    const res = await request(app)
      .put(`/rooms/${roomId}`)
      .send({
        maxConnections: 3
      })
    expect(res.body.maxConnections).toBe(3);
  });
  test('should delete an user name DELETE-/rooms/:id', async () => {
    const res = await request(app)
      .delete(`/rooms/${roomId}`)
    expect(res.body._id).toBe(roomId);
    mongoose.connection.close();
  });


})
