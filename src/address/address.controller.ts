import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto, UpdateAddressDto } from 'dto/address.dto';
import { User } from 'entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthGuard } from 'src/auth/auth.guard';


@UseGuards(AuthGuard)
@Controller('addresses')
export class AddressController {
  constructor(
    private readonly addressService: AddressService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  @Post()
  async create(@Body() dto: CreateAddressDto , @Req() req) {
    
    return this.addressService.create({...dto , user : {id : req.user.id}});
  }

  @Get("my")
  findAll(@Query() query , @Req() req ) {
    const { page, limit, search, sortBy, role, sortOrder } = query;
    return this.addressService.findAll(
      'address',
      search,
      page,
      limit,
      sortBy,
      sortOrder,
      [],
      ["user"], // relations
      ['apartment_number', 'building_name', 'street_name', 'address_type'],
      {user : {id : req.user.id}}
    );
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.addressService.findOne(id , ["user"]);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.addressService.remove(id);
  }
}
