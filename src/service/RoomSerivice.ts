import RoomModel from '../models/Room';
import CustomError from '../utils/CustomError';
import { IRoomService } from '../interfaces/IRoom/roomService.interface';
import { IRoom } from '../interfaces/IRoom/room.interface';
import { UserService } from './UserSerivice';
import { IUserService } from '../interfaces/IUser/userService.interface';


export class RoomService implements IRoomService {

  constructor(private userService: IUserService) { }

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
    const { ownerId, name, members, admins } = room;

    // check if user exist
    await this.userService.show(ownerId);

    // check if the room already exist
    const roomAlreadyExist = await RoomModel.findOne({ ownerId, name });
    if (roomAlreadyExist) {
      throw new CustomError('Room already exist', 400);
    }
    const newRoom = new RoomModel({ ownerId, room_avatar: room.room_avatar, name, members, admins });
    try {
      await newRoom.save();
    } catch (err) {
      throw new CustomError('Internal error server', 500);
    }
    return newRoom;
  }

  async addMember(userID: string, roomID: string): Promise<IRoom> {
    // check if the room exist
    const room = await RoomModel.findOne({ _id: roomID });
    if (!room) {
      throw new CustomError('Room not exist', 404);
    }
    room.members.push(userID)
    try {
      await RoomModel.findOneAndUpdate({ _id: roomID }, room);
    } catch (err) {
      throw new CustomError('Internal error Server', 500);
    }
    return room;
  }

  /**
  * @function update
  * @desc Responsible to handle with room data update
  **/
  async update(id: string, data: IRoom): Promise<IRoom> {
    const { ownerId, name } = data;
    // WARNING: No validation yet

    await RoomModel.findOneAndUpdate({ _id: id }, data);
    const roomUpdated = await RoomModel.findOne({ _id: id });
    if (!roomUpdated) {
      throw new CustomError('Internal error server', 500);
    }
    return roomUpdated;
  }

  async updateLastMessage(id: string, message: { content: string, date: Date }) {
    await RoomModel.findOneAndUpdate({ _id: id }, { last_message: message });
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

  async removeMember(room_id: string, id: string): Promise<void> {
    // check if the room exist
    const room = await RoomModel.findOne({ _id: room_id });
    if (!room) {
      throw new CustomError('Room not exist', 404);
    }
    const userIndex = room.members.findIndex(user_id => id === user_id);
    if (userIndex != -1) {
      room.members.splice(userIndex, 1);
    }
    try {
      await RoomModel.findOneAndUpdate({ _id: room_id }, room);
    } catch (err) {
      throw new CustomError('Internal error Server', 500);
    }
  }

  async findRoomByMemberID(userID: string): Promise<IRoom[]> {
    const rooms = await RoomModel.find({ members: userID });
    return rooms;
  }

}
