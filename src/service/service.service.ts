import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from 'entities/service.entity';
import {
  CreateServiceDto,
  UpdateServiceDto,
  VariantDto,
} from 'dto/service.dto';
import { Image } from 'entities/images.entity';
import { BaseService } from 'utils/base.service';

@Injectable()
export class ServiceService extends BaseService<Service> {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepo: Repository<Service>,
    @InjectRepository(Image)
    private readonly imageRepo: Repository<Image>,
  ) {
    super(serviceRepo)
  }

  async Create(dto: CreateServiceDto, providerId: number) {
    let mainImageUrl: string = null;
    if (dto.main_image) {
      const mainImageEntity = await this.imageRepo.findOne({
        where: { id: dto.main_image },
      });
      if (!mainImageEntity) throw new NotFoundException('Main image not found');
      mainImageUrl = mainImageEntity.url;
    }

    let imagesUrls: string[] = [];
    if (dto.images && dto.images.length) {
      const imagesEntities = await Promise.all(
        dto.images.map((id) => this.imageRepo.findOne({ where: { id } })),
      );
      if (imagesEntities.some((img) => !img)) {
        throw new NotFoundException('One or more images not found');
      }
      imagesUrls = imagesEntities.map((img) => img.url);
    }

    // Resolve variant option images
    let variantsWithUrls = dto.variants || [];
    for (const variant of variantsWithUrls) {
      if (variant.options && variant.options.length) {
        for (const option of variant.options) {
          if (option.image) {
            const imgEntity = await this.imageRepo.findOne({
              where: { id: option.image as any },
            });
            if (!imgEntity)
              throw new NotFoundException(
                `Image for variant option "${option.value}" not found`,
              );
            option.image = imgEntity.url;
          }
        }
      }
    }

    const service = this.serviceRepo.create({
      ...dto,
      main_image: mainImageUrl,
      images: imagesUrls,
      variants: variantsWithUrls,
      provider: { id: providerId },
    });

    return this.serviceRepo.save(service);
  }



  async findById(id: number): Promise<Service> {
    const service = await this.serviceRepo.findOne({ where: { id } });
    if (!service) throw new NotFoundException('Service not found');
    return service;
  }

  async update(id: number, dto: UpdateServiceDto): Promise<Service> {
    const service = await this.findById(id);

    // Update main image if provided
    if (dto.main_image) {
      const mainImageEntity = await this.imageRepo.findOne({
        where: { id: dto.main_image },
      });
      if (!mainImageEntity) throw new NotFoundException('Main image not found');
      service.main_image = mainImageEntity.url;
    }

    // console.log(service.main_image)

    // Update images if provided
    if (dto.images && dto.images.length) {
      const imagesEntities = await Promise.all(
        dto.images.map((id) => this.imageRepo.findOne({ where: { id } })),
      );
      if (imagesEntities.some((img) => !img)) {
        throw new NotFoundException('One or more images not found');
      }
      service.images = imagesEntities.map((img) => img.url);
    }

    // Update variants with resolved option images if provided
    if (dto.variants) {
      for (const variant of dto.variants) {
        if (variant.options && variant.options.length) {
          for (const option of variant.options) {
            if (option.image) {
              const imgEntity = await this.imageRepo.findOne({
                where: { id: option.image as any },
              });
              if (!imgEntity)
                throw new NotFoundException(
                  `Image for variant option "${option.value}" not found`,
                );
              option.image = imgEntity.url;
            }
          }
        }
      }
      service.variants = dto.variants;
    }

    return this.serviceRepo.save(service);
  }

  async addVariants(
    serviceId: number,
    variants: VariantDto[],
  ): Promise<Service> {
    const service = await this.findById(serviceId);

    // Validate uniqueness of variant slugs within existing + new variants
    const existingSlugs = new Set((service.variants || []).map((v) => v.slug));
    for (const variant of variants) {
      if (existingSlugs.has(variant.slug)) {
        throw new BadRequestException(`Variant slug "${variant.slug}" already exists.`);
      }
      existingSlugs.add(variant.slug);

      // Resolve images for variant options
      if (variant.options && variant.options.length) {
        for (const option of variant.options) {
          if (option.image) {
            const imgEntity = await this.imageRepo.findOne({
              where: { id: option.image as any },
            });
            if (!imgEntity)
              throw new NotFoundException(
                `Image for variant option "${option.value}" not found`,
              );
            option.image = imgEntity.url;
          }
        }
      }
    }

    service.variants = [...(service.variants || []), ...variants];
    return this.serviceRepo.save(service);
  }

  async removeVariant(
    serviceId: number,
    variantSlug: string,
  ): Promise<Service> {
    const service = await this.findById(serviceId);
    service.variants = (service.variants || []).filter(
      (v) => v.slug !== variantSlug,
    );
    return this.serviceRepo.save(service);
  }

  async editVariant(
    serviceId: number,
    variantSlug: string,
    variantDto: VariantDto,
  ): Promise<Service> {
    const service = await this.findById(serviceId);
    const variants = service.variants || [];
    const index = variants.findIndex((v) => v.slug === variantSlug);
    if (index === -1) throw new NotFoundException('Variant not found');

    // Check if the updated slug conflicts with other variants
    if (
      variantDto.slug !== variantSlug &&
      variants.some((v, i) => v.slug === variantDto.slug && i !== index)
    ) {
      throw new BadRequestException(`Variant slug "${variantDto.slug}" already exists.`);
    }

    // Resolve images in options
    if (variantDto.options && variantDto.options.length) {
      for (const option of variantDto.options) {
        if (option.image) {
          const imgEntity = await this.imageRepo.findOne({
            where: { id: option.image as any },
          });
          if (!imgEntity)
            throw new NotFoundException(
              `Image for variant option "${option.value}" not found`,
            );
          option.image = imgEntity.url;
        }
      }
    }

    variants[index] = variantDto;
    service.variants = variants;
    return this.serviceRepo.save(service);
  }

  async deleteService(id: number): Promise<{ deleted: boolean }> {
    const result = await this.serviceRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Service not found');
    return { deleted: true };
  }
}
