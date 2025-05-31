import { IsNotEmpty, IsEmail, IsString, IsEnum, IsOptional, IsPhoneNumber, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UserRole } from 'entities/user.entity';


class LocalizedText {
  @IsOptional()
  @IsString({ message: 'Arabic text must be a string' })
  ar: string;

  @IsOptional()
  @IsString({ message: 'English text must be a string' })
  en: string;
}

export class CreateUserDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;


  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  avatar: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @IsEnum(UserRole, {  message: `Role must be one of: ${Object.values(UserRole).join(', ')}`  })
  @IsOptional()
  role?: UserRole = UserRole.USER;

  // @IsPhoneNumber(null, { message: 'Invalid phone number format' })
  @IsNotEmpty({ message: 'Phone number is required' })
  phone: string;

 
  @ValidateNested()
  @Type(() => LocalizedText)
  @IsObject({ message: 'Address must be an object with ar and en properties' })
  address?: LocalizedText;

  
  @ValidateNested()
  @Type(() => LocalizedText)
  @IsObject({ message: 'Business details must be an object with ar and en properties' })
  business_details?: LocalizedText;


  @IsString({ message: 'Status must be a string' })
  @IsOptional()
  status?: string = 'active';
}


import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(CreateUserDto) {}