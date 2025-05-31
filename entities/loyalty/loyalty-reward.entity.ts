import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { UserRewardClaim } from './user-reward-claim.entity';

@Entity()
export class LoyaltyReward {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'jsonb', default: { ar: '', en: '' } })
  reward_name: { ar: string; en: string };

  @Column()
  required_points: number;

  @Column({ type: 'jsonb', default: { ar: '', en: '' } })
  reward_description: { ar: string; en: string };

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => UserRewardClaim, claim => claim.reward)
  claims: UserRewardClaim[];
}