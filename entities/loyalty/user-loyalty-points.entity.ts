import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../user.entity';

@Entity()
export class UserLoyaltyPoints {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.loyaltyPoints)
  user: User;

  @Column()
  completed_orders: number;

  @Column()
  total_points: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}