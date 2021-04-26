import { Document } from 'mongoose';
import { IMessage } from './message.interface';
import { User } from './user.interface';

export interface IChat extends Document {
  _id: string;

  title?: string;

  messages?: IMessage[];

  users: User[];
}
