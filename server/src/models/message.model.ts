import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'
import { EMessageType } from 'src/enums';
import { Chat } from './chat.model'

@Schema()
export class Message {
  @Prop()
  type: EMessageType;
  
  @Prop()
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' })
  chat: Chat
}

export const MessageSchema = SchemaFactory.createForClass(Message);
