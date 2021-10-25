import mongoose, { Schema, model } from 'mongoose';
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
  contacts: {
    type: [{
      last_message: {
        content: String,
        date: Date
      },
    }],
    default: [],
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: 'undefined'
  }
})

const UserModel = model<IUser>('Users', userSchema);

export default UserModel;
