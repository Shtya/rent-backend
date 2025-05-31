import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { I18nService } from 'nestjs-i18n';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService 
    , private readonly i18n: I18nService
  ) {}

  @Get("/check")
  async greet(@Req() request: Request) {

    return {
      message: this.i18n.t('events.period_already_reserved'),
    };
  }
}
