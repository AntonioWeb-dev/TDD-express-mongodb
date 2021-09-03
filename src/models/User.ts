import { Schema, model } from 'mongoose';
import validator from 'validator';
import { IUser } from '../interfaces/user.interface';

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
  age: {
    type: Number,
    required: true
  },
})
userSchema.path('name').validate(function (name: string) {
  return (name.length > 3 && name.length < 15);
}, 'Name must have between 3-15 characters', 'BAD_REQUEST');

userSchema.path('email').validate(function (email: string) {
  return validator.isEmail(email);
}, 'Name must have between 3-15 characters', 'BAD_REQUEST');


const UserModel = model<IUser>('Users', userSchema);

export default UserModel;
