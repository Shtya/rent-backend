import { Injectable, NotFoundException, BadRequestException,} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoyaltyReward, UserRewardClaim, UserLoyaltyPoints, LoyaltyRule, RewardType, ClaimStatus, UserPointHistory, PointTransactionType } from 'entities/loyalty.entity';
import { User } from 'entities/user.entity';
import { CreateLoyaltyRewardDto, CreateLoyaltyRuleDto, ClaimRewardDto } from 'dto/loyalty.dto';

@Injectable()
export class LoyaltyService {
  constructor(
    @InjectRepository(LoyaltyReward)
    private rewardRepo: Repository<LoyaltyReward>,

    @InjectRepository(UserRewardClaim)
    private claimRepo: Repository<UserRewardClaim>,

    @InjectRepository(UserLoyaltyPoints)
    private pointsRepo: Repository<UserLoyaltyPoints>,

    @InjectRepository(UserPointHistory)
    private historyRepo: Repository<UserPointHistory>,

    @InjectRepository(LoyaltyRule)
    private ruleRepo: Repository<LoyaltyRule>,
  ) {}

  async createReward(dto: CreateLoyaltyRewardDto) {
    const reward = this.rewardRepo.create({ ...dto });
    return this.rewardRepo.save(reward);
  }

  async getAllRewards() {
    return this.rewardRepo.find();
  }
  async getAllRules() {
    return this.ruleRepo.find();
  }

  async claimReward(userId: number, rewardId: number) {
    const reward = await this.rewardRepo.findOne({ where: { id: rewardId } });
    if (!reward) throw new NotFoundException('Reward not found');

    const userPoints = await this.pointsRepo.findOne({
      where: { user: { id: userId } },
    });
    if (!userPoints || userPoints.total_points < reward.required_points)
      throw new BadRequestException('Insufficient points');

    // Deduct points
    userPoints.total_points -= reward.required_points;
    await this.pointsRepo.save(userPoints);

    // Record point usage
    await this.historyRepo.save(
      this.historyRepo.create({
        user: { id: userId },
        points: reward.required_points,
        type: PointTransactionType.REDEEM,
        description: `Redeemed: ${reward.reward_name}`,
      }),
    );

    // Create claim
    const claim = this.claimRepo.create({
      user: { id: userId },
      reward,
      claimed_at: new Date(),
      status: ClaimStatus.PENDING,
    });
    return this.claimRepo.save(claim);
  }

  async createRule(dto: CreateLoyaltyRuleDto) {
    return this.ruleRepo.save(
      this.ruleRepo.create({ ...dto }),
    );
  }

  async getUserPoints(userId: number) {
    return this.pointsRepo.findOne({ where: { user: { id: userId } } });
  }

  async getUserClaims(userId: number) {
    return this.claimRepo.find({
      where: { user: { id: userId } },
      relations: ['reward'],
    });
  }
}
