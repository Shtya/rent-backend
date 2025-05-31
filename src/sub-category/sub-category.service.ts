import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubCategoryDto, UpdateSubCategoryDto } from 'dto/sub-category.dto';
import { SubCategory } from 'entities/sub-category.entity';
import { Category } from 'entities/category.entity';
import { BaseService } from 'utils/base.service';

@Injectable()
export class SubCategoryService extends BaseService<SubCategory> {
  constructor(
    @InjectRepository(SubCategory)
    private readonly subCategoryRepo: Repository<SubCategory>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>
  ) {
    super(subCategoryRepo)
  }

  async createCustom(dto: CreateSubCategoryDto) {
    const category = await this.categoryRepo.findOne({ where: { id: dto.categoryId } });
    if (!category) throw new NotFoundException('Category not found');

    const subCategory = this.subCategoryRepo.create({ ...dto, category });
    return this.subCategoryRepo.save(subCategory);
  }



  async updateCustom(id: number, dto: UpdateSubCategoryDto) {
    const subCategory = await this.subCategoryRepo.findOne({ where: { id } });
    if (!subCategory) throw new NotFoundException('SubCategory not found');

    if (dto.categoryId) {
      const category = await this.categoryRepo.findOne({ where: { id: dto.categoryId } });
      if (!category) throw new NotFoundException('New category not found');
      subCategory.category = category;
    }

    Object.assign(subCategory, dto);
    return this.subCategoryRepo.save(subCategory);
  }

}
