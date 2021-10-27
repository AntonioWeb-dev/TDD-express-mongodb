import validator from 'validator';
import argon2 from 'argon2';
import UserModel from '../models/User';
import CustomError from '../utils/CustomError';

import { IUserService } from '../interfaces/IUser/userService.interface';
import { IUser, TContact } from '../interfaces/IUser/user.interface';
import { IMessageService } from '../interfaces/IChat/messageService.interface';


export class UserService implements IUserService {
  private messageService: IMessageService;
  constructor(messageService: IMessageService) {
    this.messageService = messageService;
  }

  /**
  * @function index
  * @desc Return all users
  **/
  async index(): Promise<IUser[]> {
    const users = await UserModel.find();
    return users;
  }

  /**
  * @function show
  * @desc Return specific user by id
  **/
  async show(id: string): Promise<IUser> {
    const user = await UserModel.findOne({ _id: id });
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    return user;
  }


  async create(user: IUser): Promise<any> {
    const { email, name, password } = user;

    // check if the data are valid
    UserService.emailValidation(email);
    UserService.nameValidation(name);
    if (!password) {
      throw new CustomError('Missing data', 400);
    }
    const passwordHash = await UserService.passwordHash(password)

    const userAlreadyExist = await UserModel.find({ email });
    if (userAlreadyExist[0]) {
      throw new CustomError('User already exist', 400);
    }
    const newUser = new UserModel({ name, email, avatar: user.avatar, password: passwordHash });
    try {
      await newUser.save();
    } catch (err) {
      throw new CustomError('Internal error server', 500);
    }
    return newUser;
  }

  /**
  * @function update
  * @desc Responsible to handle with user data update
  **/
  async update(id: string, data: IUser): Promise<IUser> {
    const { email, name } = data;
    if (name) {
      UserService.nameValidation(name);
    }
    if (email) {
      UserService.nameValidation(name);
    }


    await UserModel.findOneAndUpdate({ _id: id }, { data });
    const userUpdated = await UserModel.findOne({ _id: id });
    if (!userUpdated) {
      throw new CustomError('Internal error server', 500);
    }
    return userUpdated;
  }

  async updateAvatar(id: string, urlS3: string): Promise<IUser> {
    await UserModel.findOneAndUpdate({ _id: id }, { avatar: urlS3 });
    const userUpdated = await UserModel.findOne({ _id: id });
    if (!userUpdated) {
      throw new CustomError('Internal error server', 500);
    }
    const sender = {
      name: userUpdated.name,
      email: userUpdated.email,
      avatar: userUpdated.avatar,
      _id: userUpdated._id,
    }
    await this.messageService.updateSender(sender);
    return userUpdated;
  }

  async addContact(id: string, contact: TContact): Promise<void> {
    const contactExist = await UserModel.findOne({ _id: contact._id });
    if (!contactExist) {
      throw new CustomError('Contact not exist', 404);
    }
    try {
      const user = await UserModel.findOne({ _id: id });
      if (!user) {
        throw new CustomError('Your account was not found', 404);

      }
      const contactsUpdated = user.contacts;
      contactsUpdated.push(contact);
      console.log(contactsUpdated);
      await UserModel.findOneAndUpdate({ _id: id }, { contacts: contactsUpdated });
    } catch (err) {
      throw new CustomError('Internal error server', 500);
    }


  }

  // Remove user from database
  async delete(id: string): Promise<IUser> {
    const isDeleted = this.show(id);
    await UserModel.deleteOne({ _id: id });
    if (!isDeleted) {
      throw new CustomError('Internal error server', 500);
    }
    return isDeleted;
  }

  async findByEmail(email: string): Promise<IUser> {
    UserService.emailValidation(email);
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    return user;
  }

  async findByIds<T>(ids: string[] | T[]): Promise<IUser[]> {
    const user_ids: string[] = [];
    ids.forEach(id => typeof (id) == 'string' ? user_ids.push(id.trim()) : null);
    let users: IUser[];
    try {
      users = await UserModel.find({ _id: { $in: user_ids } });
    } catch (err) {
      throw new CustomError('Users not found', 404);

    }
    const usersToreturn = users.map((user) => ({ _id: user._id, name: user.name, email: user.email, avatar: user.avatar, contacts: user.contacts }))
    return usersToreturn;
  }

  // ========== validations ==========

  // function to validade Email
  static emailValidation(email: string) {
    if (!validator.isEmail(email)) {
      throw new CustomError('Email is not valid', 400);
    }
  }

  // function to validate user's name
  static nameValidation(name: string) {
    // regExp to validate the arguments from name.
    const regExp = /\W|[0-9]/gi;
    if (regExp.test(name)) {
      throw new CustomError('Name invalid arguments', 400);
    }
  }

  static async passwordHash(password: string) {
    if (password.length < 8) {
      throw new CustomError('Passowrd is too short', 400);
    }
    const passwordHash = await argon2.hash(password);
    return passwordHash;
  }
}
