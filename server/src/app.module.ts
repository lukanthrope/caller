import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
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
    MulterModule.register({
      dest: './files',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'files'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
