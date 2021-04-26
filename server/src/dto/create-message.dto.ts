import { IsNotEmpty } from 'class-validator';
import { EMessageType } from 'src/enums';

export class CreateMessageDTO {
  @IsNotEmpty()
  chatId: string;

  @IsNotEmpty()
  type: EMessageType;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  senderId: string;
}
