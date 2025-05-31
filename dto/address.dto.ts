import { IsNotEmpty, IsNumber, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateAddressDto {
  @IsNumber({}, { message: 'User ID must be a number' })
  @IsNotEmpty({ message: 'User ID is required' })
  user_id: number;

  @IsOptional()
  apartment_number_en?: string;

  @IsOptional()
  apartment_number_ar?: string;

  @IsOptional()
  building_name_en?: string;

  @IsOptional()
  building_name_ar?: string;

  @IsOptional()
  street_name_en?: string;

  @IsOptional()
  street_name_ar?: string;

  @IsOptional()
  additional_details_en?: string;

  @IsOptional()
  additional_details_ar?: string;

  @IsBoolean({ message: 'is_default must be a boolean' })
  @IsOptional()
  is_default?: boolean;
}


import { PartialType } from '@nestjs/mapped-types';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {}