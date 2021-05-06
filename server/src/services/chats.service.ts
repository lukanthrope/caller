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
    return this.chatModel.findOne({ _id: chatId });
  }

  public async getChatList(userId: string) {
    const user = await this.userModel.findOne({ _id: userId });
    // @ts-ignore
    const chats = await this.chatModel.find({ "users": userId });

    console.log(chats[0].messages[0].content)
    return chats
  }

  public async sendMessage(m: CreateMessageDTO) {
    const { chatId } = m;
    const message = await this.messageModel.create(m);
    await this.chatModel.updateOne(
      { _id: chatId },
      { $push: { messages: message } },
    );

    return message;
  }
}
