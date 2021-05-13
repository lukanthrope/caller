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

@WebSocketGateway(8080)
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @OnEvent(EEventTypes.MessageCreated)
  handleMessage(payload: { chat: IChat; message: IMessage }): void {
    payload.chat.users.map((user) => {
      console.log(user, '-RT');
      this.server.to(`user-${user}`).emit('new-message', payload);
    });
  }

  @SubscribeMessage('client-connection')
  handleClientConnect(client: Socket, payload: string) {
    this.logger.log(`CLIENT ${payload}`);
    client.join(`user-${payload}`);
  }

  @SubscribeMessage('call-user')
  handleCallMade(client: Socket, payload: any) {
    this.server.to(`user-${payload.to}`).emit('call-made', {
      offer: payload.offer,
      userId: payload.from,
    });
  }

  @SubscribeMessage('make-answer')
  handleAnswerMade(client: Socket, payload: any) {
    this.server.to(`user-${payload.to}`).emit('answer-made', {
      offer: payload.answer,
      userId: payload.from,
    });
  }

  @SubscribeMessage('reject-call')
  handleRejectCall(client: Socket, payload: any) {
    this.server.to(`user-${payload.to}`).emit('call-rejected', {
      offer: payload.answer,
      userId: payload.from,
    });
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
