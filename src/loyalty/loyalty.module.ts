import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoyaltyController } from './loyalty.controller';
import { LoyaltyService } from './loyalty.service';

import {
  LoyaltyReward,
  UserRewardClaim,
  UserLoyaltyPoints,
  LoyaltyRule,
  UserPointHistory,
} from 'entities/loyalty.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LoyaltyReward,
      UserRewardClaim,
      UserLoyaltyPoints,
      LoyaltyRule,
      UserPointHistory,
    ]),
  ],
  controllers: [LoyaltyController],
  providers: [LoyaltyService],
  exports: [LoyaltyService], // In case other modules like OrdersModule need to give points
})
export class LoyaltyModule {}
