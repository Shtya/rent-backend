import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateImageDto, UpdateImageDto } from 'dto/images.dto';
import { Image } from 'entities/images.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { BaseService } from 'utils/base.service';

@Injectable()
export default class ImageService extends BaseService<Image> {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {
    super(imageRepository);
  }

  async createMany(imageDtos: CreateImageDto[]): Promise<Image[]> {
    const images = this.imageRepository.create(imageDtos);
    return this.imageRepository.save(images);
  }

  async customRemove(id: number): Promise<{ message: string }> {
    const image = await this.imageRepository.findOne({ where: { id } });

    if (!image) {
      throw new NotFoundException(`Image with id ${id} not found`);
    }

    const filePath = path.join(
      process.cwd(),
      'uploads',
      path.basename(image.url),
    );

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    console.log(filePath);

    await this.imageRepository.delete(id);

    return { message: 'Image deleted successfully' };
  }
}
