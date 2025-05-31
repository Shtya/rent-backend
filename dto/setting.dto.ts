import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateSettingDto {
  @IsNotEmpty({ message: 'Site name (English) is required' })
  site_name_en: string;

  @IsNotEmpty({ message: 'Site name (Arabic) is required' })
  site_name_ar: string;

  @IsOptional()
  site_description_en?: string;

  @IsOptional()
  site_description_ar?: string;

  @IsString({ message: 'Logo URL must be a string' })
  @IsNotEmpty({ message: 'Logo URL is required' })
  logo_url: string;

  @IsString({ message: 'Favicon URL must be a string' })
  @IsNotEmpty({ message: 'Favicon URL is required' })
  favicon_url: string;

  @IsString({ message: 'Currency must be a string' })
  @IsNotEmpty({ message: 'Currency is required' })
  currency: string;

  @IsString({ message: 'Support email must be a string' })
  @IsNotEmpty({ message: 'Support email is required' })
  support_email: string;

  @IsOptional()
  support_phone_en?: string;

  @IsOptional()
  support_phone_ar?: string;

  @IsString({ message: 'Booking terms URL must be a string' })
  @IsOptional()
  booking_terms_url?: string;

  @IsString({ message: 'Privacy policy URL must be a string' })
  @IsOptional()
  privacy_policy_url?: string;
}


import { PartialType } from '@nestjs/mapped-types';

export class UpdateSettingDto extends PartialType(CreateSettingDto) {}