import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule, UsersModule, ChatsModule } from './modules';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/caller', {
      useNewUrlParser: true,
    }),
    AuthModule,
    UsersModule,
    ChatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
