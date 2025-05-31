import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Banner } from 'entities//banner.entity';
import { CreateBannerDto } from 'dto/banner.dto';
import { BaseService } from 'utils/base.service';

@Injectable()
export class BannerService extends BaseService<Banner> {
  constructor(
    @InjectRepository(Banner)
    private readonly bannerRepository: Repository<Banner>,
  ) {
    super(bannerRepository)
  }

}
