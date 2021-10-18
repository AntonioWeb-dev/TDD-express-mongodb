import { Schema, Model } from 'mongoose';
import { IMessage } from '../interfaces/IChat/message.interface';
import { IUser } from "../interfaces/IUser/user.interface";


const messageSchema = new Schema<IMessage>({
    content: {
        type: string,
        required: true,
    },
    sender: {
        type: IUser,
        required: true,
    },
    room_id: {
        type: string,
        required: true,
    },
    isResponse: {
        type: boolean,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    }
});

const MessageModel =  Model<IMessage>('messages', messageSchema);
export default MessageModel;