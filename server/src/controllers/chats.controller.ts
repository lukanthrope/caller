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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateMessageDTO } from 'src/dto';
import { AuthGuard } from 'src/guards';
import { ChatsService } from 'src/services';
import { FileUtils } from 'src/utils';

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

  @Post('send-image-message')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: FileUtils.editFileName,
      }),
      fileFilter: FileUtils.imageFileFilter,
    }),
  )
  public async sendImageMessage(@Query() dto: CreateMessageDTO, @UploadedFile() file) {
    return this.chatsService.sendMessage({ ...dto, content: file.filename })
  }
}
