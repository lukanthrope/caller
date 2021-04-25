import { EMessageType } from 'src/enums';
import { IChat } from './chat.interface';

export interface IMessage {
  _id: string;

  type: EMessageType;

  content: string;

  chat?: IChat;
}
