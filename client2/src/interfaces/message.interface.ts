import { EMessageType } from "../enums";
import { IUser } from "./user.interface";


export interface IMessage {
  _id: string;

  type: EMessageType;

  content: string;

  createdAt: Date;

  senderId: string;
}
