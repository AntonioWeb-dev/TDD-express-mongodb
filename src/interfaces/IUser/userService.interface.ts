import { IUser } from './user.interface';
export interface IUserService {
  create(user: IUser): Promise<IUser>;
  show(id: string): Promise<IUser>;
  index(): Promise<IUser[]>;
  update(id: string, data: IUser): Promise<IUser>;
  updateAvatar(id: string, urlS3: string | undefined): Promise<IUser>;
  delete(id: string): Promise<IUser>;
  findByEmail(email: string): Promise<IUser>;
  findByIds<T>(ids: string[] | T[]): Promise<IUser[]>;
}
