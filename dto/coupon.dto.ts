import { IsNotEmpty, IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateCouponDto {
  @IsString({ message: 'Code must be a string' })
  @IsNotEmpty({ message: 'Code is required' })
  code: string;

  @IsNumber({}, { message: 'Discount percentage must be a number' })
  @IsNotEmpty({ message: 'Discount percentage is required' })
  discount_percentage: number;

  @IsDateString({}, { message: 'Valid from must be a valid date' })
  @IsNotEmpty({ message: 'Valid from is required' })
  valid_from: Date;

  @IsDateString({}, { message: 'Valid to must be a valid date' })
  @IsNotEmpty({ message: 'Valid to is required' })
  valid_to: Date;

  @IsNumber({}, { message: 'Usage limit must be a number' })
  @IsNotEmpty({ message: 'Usage limit is required' })
  usage_limit: number;
}



import { PartialType } from '@nestjs/mapped-types';

export class UpdateCouponDto extends PartialType(CreateCouponDto) {}