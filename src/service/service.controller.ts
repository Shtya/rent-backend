import {
  Controller,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Patch,
  Get,
  Delete,
  Query,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import {
  CreateServiceDto,
  UpdateServiceDto,
  VariantDto,
} from 'dto/service.dto';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  async create(@Body() dto: CreateServiceDto) {
    return this.serviceService.Create(dto, dto.providerId);
  }



  @Get()
  async findAll(@Query() query) {
    const { page, limit, search, sortBy, type , sortOrder } = query;
    return this.serviceService.findAll(
      'service',
      search,
      page,
      limit,
      sortBy,
      sortOrder,
      [],
      [], // relations
      ['name'],// search
      {type : type}
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.serviceService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateServiceDto,
  ) {
    return this.serviceService.update(id, dto);
  }

  @Delete(':id')
  async deleteService(@Param('id', ParseIntPipe) id: number) {
    return this.serviceService.deleteService(id);
  }

  // Add variants to a service
  @Post(':id/variants')
  async addVariants(
    @Param('id', ParseIntPipe) id: number,
    @Body() variants: VariantDto[],
  ) {
    return this.serviceService.addVariants(id, variants);
  }

  @Delete(':id/variants/:variantSlug')
  async removeVariant(
    @Param('id', ParseIntPipe) id: number,
    @Param('variantSlug') variantSlug: string,
  ) {
    return this.serviceService.removeVariant(id, variantSlug);
  }

  @Patch(':id/variants/:variantSlug')
  async editVariant(
    @Param('id', ParseIntPipe) id: number,
    @Param('variantSlug') variantSlug: string,
    @Body() variantDto: any,
  ) {
    return this.serviceService.editVariant(id, variantSlug, variantDto);
  }
}
