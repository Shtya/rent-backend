import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFavoriteDto {
  @IsNumber({}, { message: 'User ID must be a number' })
  @IsNotEmpty({ message: 'User ID is required' })
  user_id: number;

  @IsNumber({}, { message: 'Service ID must be a number' })
  @IsNotEmpty({ message: 'Service ID is required' })
  service_id: number;
}