import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from '../controllers';
import { UsersService } from '../services';
import { UserSchema } from '../models';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
