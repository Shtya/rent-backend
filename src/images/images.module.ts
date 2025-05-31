import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ImageService from './images.service';
import { ImageController } from './images.controller';
import { Image } from 'entities/images.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  providers: [ImageService],
  controllers: [ImageController],
})
export class ImageModule {}
