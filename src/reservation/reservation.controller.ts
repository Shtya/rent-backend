import { Controller, Get, Post, Body, Param, Patch, Delete, Query, Req, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto , UpdateReservationDto } from 'dto/reservation.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';


@Controller('reservations')
@UseGuards(AuthGuard , RolesGuard )
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  Create(@Body() dto: CreateReservationDto , @Req() req ) {
    return this.reservationService.Create({...dto , user :{ id : req.user.id  } });
  }


  @Roles("admin")
  @Get()
  findAll(@Query() query) {
    const { page, limit, search, sortBy, role, sortOrder } = query;
    return this.reservationService.findAll(
      'reservations',
      search,
      page,
      limit,
      sortBy,
      sortOrder,
      [],
      ['service', 'address'], // relations
      [],// search
    );
  }


  
  @Get("my")
  findMyReservations(@Query() query , @Req() req  ) {
    const userId = req.user['id'];

    const { page, limit, search, sortBy, status, sortOrder } = query;
    return this.reservationService.findAll(
      'reservations',
      search,
      page,
      limit,
      sortBy,
      sortOrder,
      [],
      ['service', 'address' , "user" ], // relations
      [],// search
      {user : {id : userId } , status }
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationService.findOne(id , ['user', 'service', 'address']);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationService.update(id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationService.remove(id);
  }
}
