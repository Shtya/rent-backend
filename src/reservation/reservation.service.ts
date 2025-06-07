import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from 'entities/reservation.entity';
import { UpdateReservationDto  , CreateReservationDto } from 'dto/reservation.dto';
import { User } from 'entities/user.entity';
import { Service } from 'entities/service.entity';
import { Address } from 'entities/address.entity';
import { BaseService } from 'utils/base.service';

@Injectable()
export class ReservationService extends BaseService<Reservation> {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepo: Repository<Reservation>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Service)
    private readonly serviceRepo: Repository<Service>,

    @InjectRepository(Address)
    private readonly addressRepo: Repository<Address>,
  ) {
    super(reservationRepo)
  }

  async Create(dto: any) {
    const service = await this.serviceRepo.findOne({ where: { id: dto.serviceId } });
    const address = await this.addressRepo.findOne({ where: { id: dto.addressId } }) ;



    if (!address) {
      throw new NotFoundException('address not found');
    }

    const reservation = this.reservationRepo.create({
      ...dto,
      service,
      address,
    });

    return this.reservationRepo.save(reservation);
  }


  async update(id: string, dto: UpdateReservationDto) {
    const existing = await this.findOne(id);

    const address = dto.addressId
      ? await this.addressRepo.findOne({ where: { id: dto.addressId } })
      : null;

    const updated = {
      ...existing,
      ...dto,
      address: address ?? existing.address,
    };

    return this.reservationRepo.save(updated);
  }

}
