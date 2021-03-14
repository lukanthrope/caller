import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  _id: string;

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop({ required: false })
  about: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
