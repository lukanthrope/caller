import {
  Query,
  Post,
  Controller,
  Res,
  HttpStatus,
  Body,
  Get,
  UseGuards,
  Param,
} from '@nestjs/common';
import { CreateMessageDTO } from 'src/dto';
import { AuthGuard } from 'src/guards';
import { ChatsService } from 'src/services';

@UseGuards(AuthGuard)
@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get()
  public async getChats(@Query('userId') userId) {
    return this.chatsService.getChatList(userId)
  }

  @Post('create')
  public async createChat(@Body() dto: { userIds: string[] }) {
    return this.chatsService.create(dto.userIds)
  }

  @Get(':chatId')
  public async getChat(@Param() params) {
    return this.chatsService.getChat(params.chatId)
  }

  @Post('send-message')
  public async sendMessage(@Body() dto: CreateMessageDTO) {
    return this.chatsService.sendMessage(dto)
  }
}
