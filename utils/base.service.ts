import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException, Req } from '@nestjs/common';
import { Repository, Brackets, QueryFailedError } from 'typeorm';
import { checkEntityExists } from 'utils/checkEntityExists';
import { I18nService } from 'nestjs-i18n';
import { slugify } from './slugify';

export interface FindAllOptions {
  entityName: string;
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  searchFields?: string[];
  relations?: string[];
  fieldsExclude?: string[];
}

@Injectable()
export class BaseService<T> {
  @Inject(I18nService)
  public readonly i18n: I18nService;

  constructor(protected readonly repository: Repository<T>) {}

  async update(id: any, dto: any) {
    const metadata: any = this.repository.metadata;
    for (const field of Object.keys(dto)) {
      const fieldExists = metadata.columns.some(column => column.propertyName === field);

      if (!fieldExists) {
        throw new BadRequestException(this.i18n.t('events.field_not_found', { args: { field } }));
      }
    }

    await this.repository.update(id, dto);
    return checkEntityExists(this.repository, id, this.i18n.t('events.record.not_found'));
  }


  async create(dto: any, relations?: string[]) {
    const metadata: any = this.repository.metadata;
  
    for (const field of Object.keys(dto)) {
      const fieldExists = metadata.columns.some(column => column.propertyName === field);
      if (!fieldExists) {
        throw new BadRequestException(this.i18n.t('events.field_not_found', { args: { field } }));
      }
    }
  
    // Generate slug if not provided
    if (!dto.slug) {
      // Use dto.title.en or dto.title.ar if present
      if (dto.title?.en || dto.title?.ar) {
        dto.slug = slugify(dto.title.en);
      } else {
        // Fallback: check if title exists in entity fields
        const titleField = metadata.columns.find(col => col.propertyName === 'title');
        if (titleField) {
          const dbTitle = (dto as any).title;
          if (dbTitle?.en || dbTitle?.ar) {
            dto.slug = slugify(dbTitle.en);
          }
        }
      }
    }
  
    try {
      const data = this.repository.create(dto);
      return await this.repository.save(data);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        if (error.message.includes(this.i18n.t('events.duplicate_key'))) {
          throw new BadRequestException(this.i18n.t('events.record_exists'));
        }
      }
      throw new BadRequestException(error);
    }
  }
  

  async findAll(
     entityName: string,
     search?: string,
     page: any = 1,
     limit: any = 10,
     sortBy?: string,
     sortOrder: 'ASC' | 'DESC' = 'DESC',
     fieldsExclude?: string[],
     relations?: string[],
     searchFields?: string[],
     filters?: Record<string, any>,
    ) {
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;

    if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
      throw new BadRequestException(this.i18n.t('events.invalid_pagination'));
    }

    if (!['ASC', 'DESC'].includes(sortOrder)) {
      throw new BadRequestException(this.i18n.t('events.invalid_sort_order'));
    }

    const skip = (pageNumber - 1) * limitNumber;
    const query = this.repository.createQueryBuilder(entityName).skip(skip).take(limitNumber);

    if (filters && Object.keys(filters).length > 0) {
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      query.andWhere(`${entityName}.${key} = :${key}`, { [key]: value });
    }
  });
}



    //! =============== Search ==================
    if (search && searchFields?.length >= 1) {
      query.andWhere(
        new Brackets(qb => {
          searchFields.forEach(field => {
            const columnMetadata = this.repository.metadata.columns.find(col => col.propertyName === field);

            if (columnMetadata?.type === 'jsonb') {
              qb.orWhere(`LOWER(${entityName}.${field}::text) LIKE LOWER(:search)`, { search: `%${search}%` });
            } else if (columnMetadata?.type === String || columnMetadata?.type == 'text') {
              qb.orWhere(`LOWER(${entityName}.${field}) LIKE LOWER(:search)`, { search: `%${search}%` });
            } else if (['decimal', 'float'].includes(columnMetadata?.type as any)) {
              const numericSearch = parseFloat(search);
              if (!isNaN(numericSearch)) qb.orWhere(`${entityName}.${field} = :numericSearch`, { numericSearch });
            } else if (columnMetadata?.type === 'enum') {
              const enumValues = columnMetadata.enum;
              if (enumValues.includes(search)) {
                qb.orWhere(`${entityName}.${field} = :value`, { value: search });
              } else {
                throw new BadRequestException(this.i18n.t('events.invalid_enum_value', { args: { field, values: enumValues.join(', ') } }));
              }
            } else {
              qb.orWhere(`${entityName}.${field} = :search`, { search });
            }
          });
        })
      );
    }

    //! =============== Add Relations ==================
    if (relations?.length > 0) {
      const invalidRelations = relations.filter(relation => !this.repository.metadata.relations.some(rel => rel.propertyName === relation));
      if (invalidRelations.length > 0) {
        throw new BadRequestException(this.i18n.t('events.invalid_relations', { args: { relations: invalidRelations.join(', ') } }));
      }
      relations.forEach(relation => {
        query.leftJoinAndSelect(`${entityName}.${relation}`, relation);
      });
    }

    //! =============== Sorting ==================
    const defaultSortBy = 'created_at';
    const sortField = sortBy || defaultSortBy;
    const sortDirection = sortOrder || 'DESC';

    const columnExists = this.repository.metadata.columns.some(col => col.propertyName === sortField);
    if (!columnExists) {
      throw new BadRequestException(this.i18n.t('events.invalid_sort_by', { args: { sortBy: sortField } }));
    }
    query.orderBy(`${entityName}.${sortField}`, sortDirection);


    //! Fetch data
    const [data, total] = (await query.getManyAndCount()) as any;


    return { limit: limitNumber, countRecored: total, page: pageNumber, data };
  }

  async findOne(id: any, relations?: string[]) {
    const entity: any = await this.repository.findOne({ where: { id } as any, relations });
  
    if (!entity) {
      throw new NotFoundException(this.i18n.t('events.record_not_found', { args: { id } }));
    }
  
    return entity;
  }
  

  async remove(id: any) {
    await checkEntityExists(this.repository, id, this.i18n.t('events.record_not_found', { args: { id } }));
    await this.repository.delete(id);

    return { message: this.i18n.t('events.record_deleted', { args: { id } }) };
  }
}
