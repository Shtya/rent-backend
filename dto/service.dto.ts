import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsArray,
  IsObject,
  ValidateNested,
  IsIn,
  IsDateString,
  ArrayNotEmpty,
  IsDefined,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

class TranslationDto {
  @IsString()
  ar: string;

  @IsString()
  en: string;
}

class VariantOptionDto {
  @IsString()
  value: string;

  @IsBoolean()
  default: boolean;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  compared_price?: number;

  @IsString({message : "must be string"})
  image: string;
}

export class VariantDto {
  @IsString()
  name: string;


  @IsString()
  slug : string;

  @IsIn(['dropdown', 'radio', 'list'])
  type: 'dropdown' | 'radio' | 'list';

  @IsBoolean()
  required: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VariantOptionDto)
  options: VariantOptionDto[];
}

class AttributeDto {
  @IsString()
  key: string;

  @IsString()
  value: string;
}

class AvailabilityDto {
  @IsNumber()
  day_of_week: number; // 0-6

  @IsString()
  from_time: string; // e.g., "09:00"

  @IsString()
  to_time: string; // e.g., "18:00"
}


export enum ServiceType {
  PRODUCT = 'product',
  SERVICE = 'service',
}

export class CreateServiceDto {
  @IsString()
  slug: string;

   @IsEnum(ServiceType)
  type: ServiceType;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => TranslationDto)
  title: TranslationDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => TranslationDto)
  description: TranslationDto;

  @IsNotEmpty()
  @IsNumber()
  main_image?: number;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  images?: number[];


  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  discount_price?: number;

  @IsOptional()
  @IsDateString()
  discount_start?: string;

  @IsOptional()
  @IsDateString()
  discount_end?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VariantDto)
  @IsOptional()
  variants?: VariantDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttributeDto)
  @IsOptional()
  attributes?: AttributeDto[];

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsOptional()
  @IsNumber()
  duration_minutes?: number;

  @IsOptional()
  @IsString()
  cancellation_policy?: string;

  @IsBoolean()
  @IsOptional()
  requires_deposit?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AvailabilityDto)
  @IsOptional()
  availability?: AvailabilityDto[];

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  relatedServicesIds?: number[];

  @IsNotEmpty()
  @IsNumber()
  providerId: number;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @IsOptional()
  @IsNumber()
  subCategoryId?: number;
}



import { PartialType } from '@nestjs/mapped-types';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {}