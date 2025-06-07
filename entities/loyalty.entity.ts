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

export enum RewardType {
  DISCOUNT = 'discount',
  VOUCHER = 'voucher',
  CASHBACK = 'cashback',
}

export enum ClaimStatus {
  PENDING = 'pending',
  USED = 'used',
}

export enum PointTransactionType {
  EARN = 'earn',
  REDEEM = 'redeem',
}

@Entity()
export class LoyaltyReward {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reward_name: string;

  @Column()
  required_points: number;

  @Column()
  reward_description: string;

  @Column({ type: 'enum', enum: RewardType })
  reward_type: RewardType;

  @Column()
  reward_value: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => UserRewardClaim, claim => claim.reward)
  claims: UserRewardClaim[];
}

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

  @Column({ type: 'enum', enum: ClaimStatus, default: ClaimStatus.PENDING })
  status: ClaimStatus;
}

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

@Entity()
export class UserPointHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.pointHistory)
  user: User;

  @Column()
  points: number;

  @Column({ type: 'enum', enum: PointTransactionType })
  type: PointTransactionType;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;
}

@Entity()
export class LoyaltyRule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  required_orders: number;

  @Column()
  granted_points: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
