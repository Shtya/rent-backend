import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Patch,
} from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerDto } from 'dto/banner.dto';

@Controller('banners')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Post()
  create(@Body() dto: CreateBannerDto) {
    return this.bannerService.create(dto);
  }

  @Get()
  findAll(@Query() query) {
    const { page, limit, search, sortBy, role, sortOrder } = query;
    return this.bannerService.findAll(
      'banner',
      search,
      page,
      limit,
      sortBy,
      sortOrder,
      [],
      [], // relations
      ['name'], // search
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bannerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.bannerService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bannerService.remove(+id);
  }
}
