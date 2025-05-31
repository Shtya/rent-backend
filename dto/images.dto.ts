import { IsString, IsOptional } from 'class-validator';

export class CreateImageDto {
  @IsString()
  url: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  alt?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateImageDto {
  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  alt?: string;

}
