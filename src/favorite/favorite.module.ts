// favorite.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from 'entities/favorite.entity';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { User } from 'entities/user.entity';
import { Service } from 'entities/service.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, User, Service])],
  providers: [FavoriteService , JwtService ],
  controllers: [FavoriteController],
})
export class FavoriteModule {}
