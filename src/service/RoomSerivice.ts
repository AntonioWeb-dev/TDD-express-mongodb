import RoomModel from '../models/Room';
import CustomError from '../utils/CustomError';
import { IRoomService } from '../interfaces/IRoom/roomService.interface';
import { IRoom } from '../interfaces/IRoom/room.interface';
import { UserService } from './UserSerivice';


export class RoomService implements IRoomService {

  constructor() { }

  /**
  * @function index
  * @desc Return all rooms
  **/
  async index(): Promise<IRoom[]> {
    const rooms = await RoomModel.find();
    return rooms;
  }

  /**
  * @function show
  * @desc Return room by id
  **/
  async show(id: string): Promise<IRoom> {
    const room = await RoomModel.findOne({ _id: id });
    if (!room) {
      throw new CustomError('Room not found', 404);
    }
    return room;
  }

  /**
  * @function create
  * @desc Responsible to create a room
  **/
  async create(room: IRoom): Promise<any> {
    const { ownerId, maxConnections, name } = room;
    const userService = new UserService();

    // check if user exist
    await userService.show(ownerId);

    // check if the room already exist
    const roomAlreadyExist = await RoomModel.findOne({ ownerId, name });
    if (roomAlreadyExist) {
      throw new CustomError('Room already exist', 400);
    }
    const newRoom = new RoomModel({ ownerId, maxConnections, name });
    try {
      await newRoom.save();
    } catch (err) {
      throw new CustomError('Internal error server', 500);
    }
    return newRoom;
  }

  /**
  * @function update
  * @desc Responsible to handle with room data update
  **/
  async update(id: string, data: IRoom): Promise<IRoom> {
    const { ownerId, name, maxConnections } = data;
    // WARNING: No validation yet

    await RoomModel.findOneAndUpdate({ _id: id }, data);
    const roomUpdated = await RoomModel.findOne({ _id: id });
    if (!roomUpdated) {
      throw new CustomError('Internal error server', 500);
    }
    return roomUpdated;
  }

  /**
  * @function delete
  * @desc Delete a room by id
  **/
  async delete(id: string): Promise<IRoom> {
    const isDeleted = this.show(id);
    await RoomModel.deleteOne({ _id: id });
    if (!isDeleted) {
      throw new CustomError('Internal error server', 500);
    }
    return isDeleted;
  }

}
