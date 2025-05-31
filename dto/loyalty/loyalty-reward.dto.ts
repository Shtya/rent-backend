import { IsNotEmpty, IsString, IsNumber, IsInt, IsOptional } from 'class-validator';

export class CreateLoyaltyRewardDto {
  @IsNotEmpty({ message: 'Reward name (English) is required' })
  reward_name_en: string;

  @IsNotEmpty({ message: 'Reward name (Arabic) is required' })
  reward_name_ar: string;

  @IsInt({ message: 'Required points must be an integer' })
  @IsNotEmpty({ message: 'Required points is required' })
  required_points: number;

  @IsOptional()
  reward_description_en?: string;

  @IsOptional()
  reward_description_ar?: string;
}