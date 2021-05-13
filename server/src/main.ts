import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WsAdapter } from '@nestjs/platform-ws';
import { AppModule } from './app.module';
import * as cors from 'cors'
 
async function bootstrap() {
  const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
  };

  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });

  app.use(cors(corsOptions))
  app.enableCors()

  await app.listen(5000);
}
bootstrap();
