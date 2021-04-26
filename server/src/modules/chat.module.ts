import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema, MessageSchema } from 'src/models';
import { ChatsController } from '../controllers';
import { ChatsService } from '../services';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Chat', schema: ChatSchema }]),
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
  ],
  controllers: [ChatsController],
  providers: [ChatsService],
})
export class ChatsModule {}
