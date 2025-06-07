import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Service } from './service.entity';

export enum ComplaintStatus {
  ANSWERED = 'answered',
  NEEDS_ANSWER = 'needs_answer',
}

@Entity()
export class Complaint {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Service, (service) => service.complaints)
  service: Service;


  @ManyToOne(() => User, (user) => user.complaints)
  user: User;

  @Column({ type: 'enum', enum: ComplaintStatus, default: ComplaintStatus.NEEDS_ANSWER, })
  status: ComplaintStatus;

  @Column({default : ""})
  message: string;

  @OneToMany(() => ComplaintReply, (reply) => reply.complaint)
  replies: ComplaintReply[];

  @CreateDateColumn()
  created_at: Date;
}

@Entity()
export class ComplaintReply {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Complaint, (complaint) => complaint.replies, {
    onDelete: 'CASCADE',
  })
  complaint: Complaint;

  @ManyToOne(() => User, { eager: true })
  author: User;
}
