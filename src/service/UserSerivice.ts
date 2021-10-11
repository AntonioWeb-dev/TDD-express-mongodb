import validator from 'validator';
import argon2 from 'argon2';
import UserModel from '../models/User';
import CustomError from '../utils/CustomError';

import { IUserService } from '../interfaces/IUser/userService.interface';
import { IUser } from '../interfaces/IUser/user.interface';


export class UserService implements IUserService {

  constructor() { }

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
  /**
  * @function create
  * @desc Responsible to create an user
  * The data must be send with form-data
  **/
  async create(user: IUser): Promise<any> {
    const { email, name, age, password } = user;

    // check if the params are valid
    UserService.emailValidation(email);
    UserService.nameValidation(name);
    UserService.ageValidation(age);
    const passwordHash = await UserService.passwordHash(password)

    const userAlreadyExist = await UserModel.find({ email });
    if (userAlreadyExist[0]) {
      throw new CustomError('User already exist', 400);
    }
    const newUser = new UserModel({ name, email, age, avatar: user.avatar, password: passwordHash });
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
    const { email, name, age } = data;
    if (name) {
      UserService.nameValidation(name);
    }
    if (email) {
      UserService.nameValidation(name);
    }
    if (age) {
      UserService.ageValidation(age);
    }

    await UserModel.findOneAndUpdate({ _id: id }, data);
    const userUpdated = await UserModel.findOne({ _id: id });
    if (!userUpdated) {
      throw new CustomError('Internal error server', 500);
    }
    return userUpdated;
  }

  /**
  * @function delete
  * @desc Delete a user by id
  **/
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

  // function to validate user's age
  static ageValidation(age: number) {
    if (!age || age <= 0) {
      throw new CustomError('Age it is not valid', 400);
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
