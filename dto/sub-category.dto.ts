import { IsNotEmpty, IsObject, IsString, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class LocalizedName {
  @IsString()
  @IsNotEmpty()
  ar: string;

  @IsString()
  @IsNotEmpty()
  en: string;
}

export class CreateSubCategoryDto {
  @ValidateNested()
  @Type(() => LocalizedName)
  @IsObject()
  name: LocalizedName;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  categoryId: number;
}



import { PartialType } from '@nestjs/mapped-types';

export class UpdateSubCategoryDto extends PartialType(CreateSubCategoryDto) {}


