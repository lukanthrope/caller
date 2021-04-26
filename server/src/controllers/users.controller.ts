import { Controller, UseGuards, Get, Query } from '@nestjs/common';
import { UsersService } from '../services';
import { AuthGuard } from 'src/guards';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  private usersService: UsersService;

  constructor(usersService: UsersService) {
    this.usersService = usersService;
  }

  @Get()
  public async getList(@Query('_id') _id: string) {
    return this.usersService.getList(_id);
  }
}
