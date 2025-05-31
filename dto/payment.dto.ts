import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber({}, { message: 'Order ID must be a number' })
  @IsNotEmpty({ message: 'Order ID is required' })
  order_id: number;

  @IsString({ message: 'Payment type must be a string' })
  @IsNotEmpty({ message: 'Payment type is required' })
  payment_type: string;

  @IsString({ message: 'Payment status must be a string' })
  @IsNotEmpty({ message: 'Payment status is required' })
  payment_status: string;

  @IsString({ message: 'Transaction ID must be a string' })
  @IsOptional()
  transaction_id?: string;
}


import { PartialType } from '@nestjs/mapped-types';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {}