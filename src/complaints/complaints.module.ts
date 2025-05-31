import { Module } from '@nestjs/common';
import { ComplaintsService } from './complaints.service';
import { ComplaintsController } from './complaints.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Complaint, ComplaintReply } from 'entities/complaint.entity';
import { User } from 'entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Complaint, ComplaintReply, User])],
  providers: [ComplaintsService , JwtService  ],
  controllers: [ComplaintsController],
})
export class ComplaintsModule {}
