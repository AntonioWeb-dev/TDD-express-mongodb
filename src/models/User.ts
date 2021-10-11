import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/IUser/user.interface';

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true
  },
  avatar: {
    type: String,
    default: 'undefined'
  }
})

const UserModel = model<IUser>('Users', userSchema);

export default UserModel;
