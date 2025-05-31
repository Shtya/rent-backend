import { IsNotEmpty, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';


export class CreateCartDto {
  @IsNumber({}, { message: 'User ID must be a number' })
  @IsNotEmpty({ message: 'User ID is required' })
  user_id: number;
}



export class UpdateCartDto extends PartialType(CreateCartDto) {}



export class CreateCartItemDto {
  @IsNumber({}, { message: 'Service ID must be a number' })
  @IsNotEmpty({ message: 'Service ID is required' })
  service_id: number;

  @IsNumber({}, { message: 'Cart ID must be a number' })
  @IsNotEmpty({ message: 'Cart ID is required' })
  cart_id: number;

  @IsNumber({}, { message: 'Quantity must be a number' })
  @IsNotEmpty({ message: 'Quantity is required' })
  quantity: number;
}


export class UpdateCartItemDto extends PartialType(CreateCartItemDto) {}