import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { IChat, IMessage } from './interfaces';
import { OnEvent } from '@nestjs/event-emitter';
import { EEventTypes } from './enums';

@WebSocketGateway(80)
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @OnEvent(EEventTypes.MessageCreated)
  handleMessage(
    payload: { chat: IChat; message: IMessage },
  ): void {
    console.log(payload, 'PP', this.server);
    payload.chat.users.map((user) => {
        console.log(user)
      this.server.to(`user-${user}`).emit('new-message', payload);
    });
  }

  @SubscribeMessage('client-connection')
  handleClientConnect(client: Socket, payload: string) {
    this.logger.log(`CLIENT ${payload}`);
    client.join(`user-${payload}`);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, data: any) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
