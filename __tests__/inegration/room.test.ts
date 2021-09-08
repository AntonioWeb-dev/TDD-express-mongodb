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
  it('should POST an user route POST-/rooms', async () => {
    const res = await request(app)
      .post('/rooms')
      .set({ ownerid: '6137eb4ae97c49abe7baa1ea' })
      .send({
        maxConnections: 5,
        name: 'Sala de fisica',
      });
    expect(res.body.maxConnections).toBe(5);
    roomId = res.body._id;
  });

  it('should get rooms route GET-/rooms', async () => {
    const res = await request(app)
      .get('/rooms')
    expect(res.status).toBe(200);
  });

  it('should update rooms name PUT-/rooms/:id', async () => {
    const res = await request(app)
      .put(`/rooms/${roomId}`)
      .send({
        maxConnections: 3
      })
    expect(res.body.maxConnections).toBe(3);
  });
  it('should delete an user name DELETE-/rooms/:id', async () => {
    const res = await request(app)
      .delete(`/rooms/${roomId}`)
    expect(res.body._id).toBe(roomId);
    mongoose.connection.close();
  });


})
