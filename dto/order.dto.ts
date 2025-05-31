import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNumber({}, { message: 'Service ID must be a number' })
  @IsNotEmpty({ message: 'Service ID is required' })
  service_id: number;

  @IsNumber({}, { message: 'User ID must be a number' })
  @IsNotEmpty({ message: 'User ID is required' })
  user_id: number;

  @IsString({ message: 'Status must be a string' })
  @IsNotEmpty({ message: 'Status is required' })
  status: string;

  @IsNumber({}, { message: 'Total price must be a number' })
  @IsNotEmpty({ message: 'Total price is required' })
  total_price: number;
}



import { PartialType } from '@nestjs/mapped-types';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}