import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from 'entities/service.entity';
import { Image } from 'entities/images.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Service , Image])],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
