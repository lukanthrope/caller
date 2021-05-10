import { IsNotEmpty } from 'class-validator';
import { EMessageType } from 'src/enums';

export class CreateMessageDTO {
  @IsNotEmpty()
  chatId: string;

  @IsNotEmpty()
  type: EMessageType;

  content: string;

  @IsNotEmpty()
  senderId: string;
}
