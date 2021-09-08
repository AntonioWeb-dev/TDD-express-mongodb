import { IUser } from './user.interface';
export interface IUserService {
  create(user: IUser): Promise<IUser>;
  show(id: string): Promise<IUser>;
  index(): Promise<IUser[]>;
  update(id: string, data: IUser): Promise<IUser>;
  delete(id: string): Promise<IUser>;
}
