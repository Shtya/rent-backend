import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { CreateSubCategoryDto, UpdateSubCategoryDto } from 'dto/sub-category.dto';
import { ImageUploadInterceptor } from 'utils/upload-image.interceptor';
import { multerOptions } from 'common/multer.config';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('sub-categories')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @UseInterceptors( FileInterceptor('file', multerOptions), ImageUploadInterceptor )
  @Post()
  create(@Body() dto: CreateSubCategoryDto) {
    return this.subCategoryService.createCustom(dto);
  }

  @Get()
  findAll(@Query() query) {
    const { page, limit, search, sortBy, role, sortOrder } = query;
    return this.subCategoryService.findAll(
      'subCategory',
      search,
      page,
      limit,
      sortBy,
      sortOrder,
      [],
      ["category"],
      ['name'],
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subCategoryService.findOne(+id , ['category']);
  }

  @UseInterceptors( FileInterceptor('file', multerOptions), ImageUploadInterceptor )
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSubCategoryDto) {
    return this.subCategoryService.updateCustom(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subCategoryService.remove(+id);
  }
}
