export interface IUser {
  name: string;
  age: number;
  password: string;
  email: string;
  avatar: string | undefined;
  _id?: string;
}
