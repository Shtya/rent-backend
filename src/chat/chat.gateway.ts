import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { CreateChatMessageDto } from 'dto/chat-message.dto';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('send_message')
  async handleMessage(@MessageBody() body: CreateChatMessageDto) {
    const message = await this.chatService.createMessage(body);
    this.server.emit('receive_message', {
      id: message.id,
      content: message.content,
      senderId: message.sender.id,
      receiverId: message.receiver.id,
      created_at: message.created_at,
    });
  }

  handleConnection(socket: Socket) {
    const userId = socket.handshake.query.userId;
    if (userId) socket.join(userId.toString());
  }
}
