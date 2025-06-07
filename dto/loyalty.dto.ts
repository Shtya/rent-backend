import { IsEnum, IsInt, IsString , Min } from 'class-validator';
import { RewardType } from 'entities/loyalty.entity';

export class CreateLoyaltyRuleDto {
  @IsInt()
  @Min(1)
  required_orders: number;

  @IsInt()
  @Min(1)
  granted_points: number;
}




export class CreateLoyaltyRewardDto {
  @IsString()
  reward_name: string;

  @IsString()
  reward_description: string;

  @IsEnum(RewardType)
  reward_type: RewardType;

  @IsString()
  reward_value: string;

  @IsInt()
  required_points: number;
}




export class ClaimRewardDto {
  @IsInt()
  reward_id: number;
}
