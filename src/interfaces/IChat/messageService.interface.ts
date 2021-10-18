
export interface IMessageService {
    find(filter: any): Promise<IMessage[]>;
    findByRoom(room_id): Promise<IMessage[]>;
    create(message: IMessage): Promise<IMessage>;
    delete(id: IMessage): Promise<IMessage>;
}