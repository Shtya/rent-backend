import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { CreateImageDto, UpdateImageDto } from 'dto/images.dto';
import { Image } from 'entities/images.entity';
import ImageService from './images.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'common/multer.config';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  findAll(@Query() query) {
     const { page, limit, search, sortBy, sortOrder, ...restQueryParams } = query;

    return this.imageService.findAll(
      'image',
      search,
      page,
      limit,
      sortBy,
      sortOrder,
      [], // exclude some fields
      [], // Relations
      ['name'], // search parameters
      restQueryParams, // search with fields
    );;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.imageService.findOne(id);
  }

  @Post('')
  @UseInterceptors(FilesInterceptor('files', 10, multerOptions))
  async uploadImages( @UploadedFiles() files: any[], @Body() dto: any, ) {

    const images: CreateImageDto[] = (files || []).map((file, i) => ({
      url: `/uploads/${file.filename}`,
      name: file.originalname,
      alt: dto?.alt?.[i] || `Image ${i + 1}`,
    }));

    return this.imageService.createMany(images);
  }


  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.imageService.customRemove(id);
  }
}
