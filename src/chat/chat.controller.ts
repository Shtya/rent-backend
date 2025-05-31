import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { AuthGuard } from 'src/auth/auth.guard';

// @UseGuards(AuthGuard)
@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly chatGateway: ChatGateway, // Inject it
  ) {}


  @Get('contacts/:userId')
  async getUserContacts(@Param('userId') userId: number) {
    return this.chatService.getUserContacts(userId);
  }

  @Get('user/:userId')
  getAllMessagesForUser(@Param('userId') userId: number) {
    return this.chatService.getMessagesForUser(userId);
  }

  @Get('between/:user1Id/:user2Id')
  getMessages(@Param('user1Id') u1: number, @Param('user2Id') u2: number) {
    return this.chatService.getMessagesBetween(u1, u2);
  }

  @Get('messages/:user1/:user2')
  getMessagesBetweenUsers(
    @Param('user1') user1: number,
    @Param('user2') user2: number,
  ) {
    return this.chatService.getMessagesBetweenUsers(+user1, +user2);
  }

  @Post()
  async createMessage(@Body() dto: any) {
    const message = await this.chatService.createMessage(dto);

    // Manually emit WebSocket message
    this.chatGateway.server.emit('receive_message', {
      id: message.id,
      content: message.content,
      senderId: message.sender.id,
      receiverId: message.receiver.id,
      created_at: message.created_at,
    });

    return message;
  }
}
