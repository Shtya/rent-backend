import { IsNotEmpty, IsNumber, IsInt } from 'class-validator';

export class CreateLoyaltyRuleDto {
  @IsInt({ message: 'Required orders must be an integer' })
  @IsNotEmpty({ message: 'Required orders is required' })
  required_orders: number;

  @IsInt({ message: 'Granted points must be an integer' })
  @IsNotEmpty({ message: 'Granted points is required' })
  granted_points: number;
}

