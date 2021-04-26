import { IMessage } from "./message.interface";
import { IUser } from "./user.interface";

export interface IChat {
  _id: string;

  title?: string;

  messages?: IMessage[];

  users: IUser[];
}
