import { IsNotEmpty } from 'class-validator';

export class AddUserToChatDTO {
  @IsNotEmpty()
  chatId: string;

  @IsNotEmpty()
  userId: string;
}
