import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Complaint, ComplaintStatus } from 'entities/complaint.entity';
import { Repository } from 'typeorm';
import { CreateComplaintDto, CreateReplyDto } from 'dto/complaint.dto';
import { User } from 'entities/user.entity';
import { ComplaintReply } from 'entities/complaint.entity';
import { BaseService } from 'utils/base.service';

@Injectable()
export class ComplaintsService extends BaseService<Complaint> {
  constructor(
    @InjectRepository(Complaint)
    private complaintRepo: Repository<Complaint>,
    @InjectRepository(ComplaintReply)
    private replyRepo: Repository<ComplaintReply>,
  ) {
    super(complaintRepo);
  }

  async createComplaint(dto: CreateComplaintDto, user: User) {
    const complaint = this.complaintRepo.create({
      message: dto.message,
      user,
      status: dto.status || ComplaintStatus.NEEDS_ANSWER,
    });
    return this.complaintRepo.save(complaint);
  }

  async getAllComplaints() {
    return this.complaintRepo.find({
      relations: ['user'],
      order: { created_at: 'DESC' },
    });
  }

  async addReply(dto: CreateReplyDto, user: User) {
    const complaint = await this.complaintRepo.findOneBy({
      id: dto.complaintId,
    });
    if (!complaint) throw new Error('Complaint not found');

    const reply = this.replyRepo.create({
      content: dto.content,
      complaint,
      author: user,
    });

    complaint.status = ComplaintStatus.ANSWERED;
    await this.complaintRepo.save(complaint);

    return this.replyRepo.save(reply);
  }
}
