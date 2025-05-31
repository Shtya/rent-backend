import { IsNotEmpty, IsNumber, IsInt, Min, Max, IsOptional } from 'class-validator';

export class CreateRatingDto {
  @IsNumber({}, { message: 'Service ID must be a number' })
  @IsNotEmpty({ message: 'Service ID is required' })
  service_id: number;

  @IsNumber({}, { message: 'User ID must be a number' })
  @IsNotEmpty({ message: 'User ID is required' })
  user_id: number;

  @IsInt({ message: 'Rating must be an integer' })
  @Min(1, { message: 'Rating must be at least 1' })
  @Max(5, { message: 'Rating must be at most 5' })
  @IsNotEmpty({ message: 'Rating is required' })
  rating: number;

  @IsOptional()
  feedback_en?: string;

  @IsOptional()
  feedback_ar?: string;
}