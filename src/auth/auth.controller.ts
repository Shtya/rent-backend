import { Body, Controller, Post, Get, UseGuards, Req, Patch, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'dto/user.dto';
import { AuthGuard } from './auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  async signin(@Body() body: { email: string; password: string }) {
    return this.authService.signin(body.email, body.password);
  }


  @Post('forgot-password')
  async forgotPassword(@Body() body: { email: string }) {
    return this.authService.forgotPassword(body.email);
  }

  @Post('verify-reset-otp')
  async verifyResetOtp(@Body() body: { email: string; otp: string }) {
    return this.authService.verifyPasswordResetOtp(body.email, body.otp);
  }

  @Post('reset-password')
  async resetPassword(@Body() body: { 
    email: string; 
    otp: string; 
    newPassword: string; 
    confirmPassword: string 
  }) {
    return this.authService.resetPassword(
      body.email, 
      body.otp, 
      body.newPassword, 
      body.confirmPassword
    );
  }

  @Post('refresh-token')
  async refreshToken(@Body() body: { refreshToken: string }) {
    return this.authService.refreshAccessToken(body.refreshToken);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Req() req: any) {
    return this.authService.getMe(req.user.id)
  }


  @UseGuards(AuthGuard) // optional: add RolesGuard if needed
  @Patch('toggle-block/:userId')
  async toggleBlockUser(@Req() req: any, @Param('userId') userId: string) {
    return this.authService.toggleBlockUser(req.user, userId);
  }

}