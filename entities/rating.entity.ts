import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Service } from './service.entity';
import { User } from './user.entity';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Service, service => service.ratings)
  service: Service;

  @ManyToOne(() => User, user => user.ratings)
  user: User;

  @Column()
  rating: number;

  @Column({ type: 'jsonb', default: { ar: '', en: '' } })
  feedback: { ar: string; en: string };

  @CreateDateColumn()
  created_at: Date;
}