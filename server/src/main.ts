import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WsAdapter } from '@nestjs/platform-ws';
import { AppModule } from './app.module';
import * as cors from 'cors'
 
async function bootstrap() {
  
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });

  app.enableCors()

  await app.listen(5000);
}
bootstrap();
