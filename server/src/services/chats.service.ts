import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateMessageDTO } from 'src/dto';
import { IClient, User, IChat, IMessage } from '../interfaces';

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel('Chat') private chatModel: Model<IChat>,
    @InjectModel('Message') private messageModel: Model<IMessage>,
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  public async create(userIds: string[]) {
    let users: User[];

    users = await Promise.all(
      userIds.map(async (_id) => this.userModel.findOne({ _id })),
    );

    return this.chatModel.create({ users });
  }

  public async getChat(chatId: string) {
    const chat = await this.chatModel.findOne({ _id: chatId });

    chat.messages = await this.messageModel.find({ chatId });
    console.log(chat.messages);

    return chat;
  }

  public async getChatList(userId: string) {
    // @ts-ignore
    const chats = await this.chatModel.find({ users: userId });

    return chats;
  }

  public async sendMessage(m: CreateMessageDTO) {
    return this.messageModel.create(m);
  }
}
