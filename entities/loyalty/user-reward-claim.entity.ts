import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user.entity';
import { LoyaltyReward } from './loyalty-reward.entity';

@Entity()
export class UserRewardClaim {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.rewardClaims)
  user: User;

  @ManyToOne(() => LoyaltyReward, reward => reward.claims)
  reward: LoyaltyReward;

  @Column()
  claimed_at: Date;
}