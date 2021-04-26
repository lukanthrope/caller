import { Document } from 'mongoose';
import { EMessageType } from 'src/enums';
import { User } from 'src/models';

export interface IMessage extends Document {
  _id: string;

  type: EMessageType;

  content: string;

  createdAt: Date;

  sender: User;
}
