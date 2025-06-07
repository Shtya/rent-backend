import { IsEnum, IsNotEmpty, IsOptional, IsString, IsBoolean, IsNumber } from 'class-validator';
import { TypeAddress } from '../entities/address.entity';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  apartment_number: string;

  @IsString()
  @IsNotEmpty()
  building_name: string;

  @IsString()
  @IsNotEmpty()
  street_name: string;

  @IsString()
  @IsOptional()
  additional_details: string;

  @IsEnum(TypeAddress)
  @IsOptional()
  address_type: TypeAddress;

  @IsBoolean()
  @IsOptional()
  is_default: boolean;
}


import { PartialType } from '@nestjs/mapped-types';
export class UpdateAddressDto extends PartialType(CreateAddressDto) {}

