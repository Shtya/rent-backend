import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateDomainDto {
  @IsNotEmpty({ message: 'Name (English) is required' })
  name_en: string;

  @IsNotEmpty({ message: 'Name (Arabic) is required' })
  name_ar: string;

  @IsOptional()
  description_en?: string;

  @IsOptional()
  description_ar?: string;

  @IsBoolean({ message: 'Active must be a boolean' })
  @IsOptional()
  active?: boolean;
}

export class UpdateDomainDto extends PartialType(CreateDomainDto) {}

export class CreateDomainConfigurationDto {
  @IsNumber({}, { message: 'Domain ID must be a number' })
  @IsNotEmpty({ message: 'Domain ID is required' })
  domain_id: number;

  @IsString({ message: 'Banner URL must be a string' })
  @IsNotEmpty({ message: 'Banner URL is required' })
  banner_url: string;

  @IsOptional()
  service_types_en?: string;

  @IsOptional()
  service_types_ar?: string;
}

export class UpdateDomainConfigurationDto extends PartialType(
  CreateDomainConfigurationDto,
) {}
