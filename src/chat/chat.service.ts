import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatMessage } from 'entities/chat-message.entity';
import { Repository } from 'typeorm';
import { CreateChatMessageDto } from 'dto/chat-message.dto';
import { User } from 'entities/user.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatMessage)
    private chatRepo: Repository<ChatMessage>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async getUserContacts(userId: number): Promise<User[]> {
    // Get all messages where the user is either sender or receiver
    const messages = await this.chatRepo.find({
      where: [{ sender: { id: userId } }, { receiver: { id: userId } }],
      relations: ['sender', 'receiver'],
    });

    // Extract all unique contacts
    const contacts = new Map<number, User>();

    messages.forEach((message) => {
      // Add the other user in the conversation (not the current user)
      if (message.sender.id !== userId) {
        contacts.set(message.sender.id, message.sender);
      }
      if (message.receiver.id !== userId) {
        contacts.set(message.receiver.id, message.receiver);
      }
    });

    return Array.from(contacts.values());
  }



  
  async getMessagesForUser(userId: number): Promise<ChatMessage[]> {
    return this.chatRepo.find({
      where: [{ sender: { id: userId } }, { receiver: { id: userId } }],
      relations: ['receiver', 'sender'],
      order: { created_at: 'DESC' },
    });
  }

  async getMessagesBetweenUsers(user1: number, user2: number) {
    return this.chatRepo.find({
      where: [
        { sender: { id: user1 }, receiver: { id: user2 } },
        { sender: { id: user2 }, receiver: { id: user1 } },
      ],
      relations: ['receiver', 'sender'],
      order: { created_at: 'ASC' },
    });
  }

  async createMessage(dto: CreateChatMessageDto): Promise<ChatMessage> {
    const sender = await this.userRepo.findOneBy({ id: dto.senderId });
    const receiver = await this.userRepo.findOneBy({ id: dto.receiverId });

    const message = this.chatRepo.create({
      content: dto.content,
      sender,
      receiver,
    });

    return this.chatRepo.save(message);
  }

  async getMessagesBetween(
    user1Id: number,
    user2Id: number,
  ): Promise<ChatMessage[]> {
    return this.chatRepo.find({
      where: [
        { sender: { id: user1Id }, receiver: { id: user2Id } },
        { sender: { id: user2Id }, receiver: { id: user1Id } },
      ],
      relations: ['receiver', 'sender'],
      order: { created_at: 'ASC' },
    });
  }
}
