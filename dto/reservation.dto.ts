import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';
import { ReservationStatus, TypePayment } from '../entities/reservation.entity';

export class CreateReservationDto {

  @IsNotEmpty()
  @IsNumber()
  serviceId: number;

  @IsNotEmpty()
  @IsNumber()
  addressId?: number;

  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @IsNumber()
  total_price: number;

  @IsEnum(TypePayment)
  payment_method: TypePayment;

  @IsOptional()
  @IsEnum(ReservationStatus)
  status?: ReservationStatus;
}


import { PartialType } from '@nestjs/mapped-types';

export class UpdateReservationDto extends PartialType(CreateReservationDto) {}
