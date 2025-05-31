import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateChatMessageDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  senderId: number;

  @IsNumber()
  receiverId: number;
}
