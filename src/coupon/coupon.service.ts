import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coupon } from 'entities/coupon.entity'
import { BaseService } from 'utils/base.service';

@Injectable()
export class CouponService  extends BaseService<Coupon> {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepo: Repository<Coupon>,
  ) {
    super(couponRepo)
  }

}
