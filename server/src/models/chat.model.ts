import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Message } from './message.model';
import { User } from './user.model';

@Schema()
export class Chat {
  @Prop({ required: false })
  title?: string;

  @Prop({ type: [{ type: String, ref: 'User' }] })
  users: User[];

  @Prop()
  messages?: Message[]
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
