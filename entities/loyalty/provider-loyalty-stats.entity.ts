import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../user.entity';

@Entity()
export class ProviderLoyaltyStats {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.providerStats)
  provider: User;

  @Column()
  total_orders: number;

  @Column()
  total_points_granted: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}