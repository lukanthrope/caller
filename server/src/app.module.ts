import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './guards';
import { AuthModule } from './modules';
import { ChatsModule } from './modules/chat.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/caller', {
      useNewUrlParser: true,
    }),
    AuthModule,
    ChatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
