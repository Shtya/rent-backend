import { Injectable } from '@nestjs/common';
import { BaseService } from 'utils/base.service';
import { Category } from 'entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService extends BaseService<Category> {
    constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    ) {
    super(categoryRepo);
    }
  }
