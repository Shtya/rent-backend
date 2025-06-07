import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from 'entities/coupon.entity';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { JwtService } from '@nestjs/jwt';
import { User } from 'entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coupon , User])],
  controllers: [CouponController],
  providers: [CouponService , JwtService ],
})
export class CouponModule {}
