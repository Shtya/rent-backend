import { Controller, Get, Post, Body, Param, Patch, Delete, Query, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto , UpdateCategoryDto } from 'dto/category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'common/multer.config';
import { ImageUploadInterceptor } from 'utils/upload-image.interceptor';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}



  @UseInterceptors( FileInterceptor('file', multerOptions), ImageUploadInterceptor )
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto , @UploadedFile() file: any ,) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll(@Query() query) {
    const { page, limit, search, sortBy, role, sortOrder } = query;
    return this.categoryService.findAll(
      'category',
      search,
      page,
      limit,
      sortBy,
      sortOrder,
      ['services', 'subCategories'],
      [],
      ['name'],
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  
  @UseInterceptors( FileInterceptor('file', multerOptions), ImageUploadInterceptor )
  @Patch(':id')
  update(@Param('id') id: string , @UploadedFile() file: any , @Body() dto: UpdateCategoryDto) {
    return this.categoryService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
