import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateMessageDTO } from 'src/dto';
import { IClient, User, IChat, IMessage } from '../interfaces';

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel('Chat') private chatModel: Model<IChat>,
    @InjectModel('Message') private messageModel: Model<IMessage>,
  ) {}

  public async create(userIds: string[]) {
    return this.chatModel.create({ users: userIds });
  }

  public async getChat(chatId: string) {
    return this.chatModel.findOne({ _id: chatId });
  }

  public async getChatList(userId: string) {
    return this.chatModel.find({ users: userId as any });
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
