import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from 'entities/reservation.entity';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { User } from 'entities/user.entity';
import { Service } from 'entities/service.entity';
import { Address } from 'entities/address.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, User, Service, Address])],
  controllers: [ReservationController],
  providers: [ReservationService , JwtService ],
})
export class ReservationModule {}
