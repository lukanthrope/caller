import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'
import { Message } from './message.model'

@Schema()
export class Chat {
  @Prop({ required: false })
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Message' })
  lastMessage?: Message
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
