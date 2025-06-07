import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'entities/address.entity';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { User } from 'entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Address , User])],
  controllers: [AddressController],
  providers: [AddressService , JwtService],
})
export class AddressModule {}
