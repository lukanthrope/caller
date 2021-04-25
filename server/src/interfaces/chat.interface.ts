import { IMessage } from './message.interface';

export interface IChat {
  _id: string;

  title?: string;

  lastMessage?: IMessage;
}
