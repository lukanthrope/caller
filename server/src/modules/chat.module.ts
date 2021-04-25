import { Module } from '@nestjs/common';
import { ChatsController } from '../controllers';


@Module({
  controllers: [ChatsController],
  providers: [],
})
export class ChatsModule {}