import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { EMessageType } from 'src/enums';
import { User } from './user.model';

@Schema({ timestamps: { createdAt: 'created_at' } })
export class Message {
  @Prop()
  type: EMessageType;

  @Prop()
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  sender: User;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
