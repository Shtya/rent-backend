import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { LoyaltyService } from './loyalty.service';
import { CreateLoyaltyRewardDto, CreateLoyaltyRuleDto , ClaimRewardDto } from 'dto/loyalty.dto';

@Controller('loyalty')
export class LoyaltyController {
  constructor(private readonly loyaltyService: LoyaltyService) {}

  @Post('reward')
  createReward(@Body() dto: CreateLoyaltyRewardDto) {
    return this.loyaltyService.createReward(dto);
  }

  @Get('rewards')
  getAllRewards() {
    return this.loyaltyService.getAllRewards();
  }
  
  
  
  @Post('rule')
  createRule(@Body() dto: CreateLoyaltyRuleDto) {
    return this.loyaltyService.createRule(dto);
  }
  @Get('rules')
  getAllRules() {
    return this.loyaltyService.getAllRules();
  }



  @Post('claim/:userId')
  claimReward(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dto: ClaimRewardDto
  ) {
    return this.loyaltyService.claimReward(userId, dto.reward_id);
  }

  @Get('points/:userId')
  getUserPoints(@Param('userId', ParseIntPipe) userId: number) {
    return this.loyaltyService.getUserPoints(userId);
  }

  @Get('claims/:userId')
  getUserClaims(@Param('userId', ParseIntPipe) userId: number) {
    return this.loyaltyService.getUserClaims(userId);
  }
}
