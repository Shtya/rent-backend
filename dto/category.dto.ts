import {
  IsNotEmpty,
  IsString,
  IsObject,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

class LocalizedName {
  @IsOptional()
  @IsString()
  ar: string;

  @IsOptional()
  @IsString()
  en: string;
}

export class CreateCategoryDto {
  @ValidateNested()
  @Type(() => LocalizedName)
  @IsObject({ message: 'Name must be an object with ar and en properties' })
  name?: LocalizedName;

  @IsNotEmpty()
  @IsString()
  image: string;
}

import { PartialType } from '@nestjs/mapped-types';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
