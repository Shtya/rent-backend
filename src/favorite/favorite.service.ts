import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFavoriteDto } from 'dto/favorite.dto';
import { Favorite } from 'entities/favorite.entity';
import { Service } from 'entities/service.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'utils/base.service';

@Injectable()
export class FavoriteService extends BaseService<Favorite> {
  constructor(
    @InjectRepository(Favorite) private favRepo: Repository<Favorite>,
      @InjectRepository(Service) private serviceRepo: Repository<Service>,
  ) {
    super(favRepo)
  }

  async addFavorite(userId: number, dto: CreateFavoriteDto) {
    // ✅ Check if the service exists
    const service = await this.serviceRepo.findOne({ where: { id: dto.serviceId } });
    if (!service) {
      throw new NotFoundException(`Service with ID ${dto.serviceId} not found`);
    }

    // ✅ Check if favorite already exists
    const exists = await this.favRepo.findOne({
      where: { user: { id: userId }, service: { id: dto.serviceId } },
    });
    if (exists) return exists;

    // ✅ Create and save favorite
    const favorite = this.favRepo.create({
      user: { id: userId },
      service: { id: dto.serviceId },
    });

    return this.favRepo.save(favorite);
  }


  async removeFavorite(userId: number, serviceId: number) {
    const result = await this.favRepo.delete({ user: { id: userId }, service: { id: serviceId } });
    if (result.affected === 0) {
      throw new NotFoundException('Favorite not found');
    }
    return { message: 'Favorite removed successfully' };
  }

  async getUserFavorites(userId: number) {
    return this.favRepo.find({
      where: { user: { id: userId } },
      relations: ['service'],
    });
  }
}
