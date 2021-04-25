import { Post, Controller, Res, HttpStatus, Body, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards';

@UseGuards(AuthGuard)
@Controller('chats')
export class ChatsController {
    @Get()
    public getChats() {

        console.log('CHATS')
    }
}