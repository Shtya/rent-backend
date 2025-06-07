import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ComplaintsService } from './complaints.service';
import { CreateComplaintDto, CreateReplyDto } from 'dto/complaint.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('complaints')
@UseGuards(AuthGuard, RolesGuard)
export class ComplaintsController {
  constructor(private readonly complaintsService: ComplaintsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() dto: CreateComplaintDto, @Req() req) {
    const user = req.user;
    return this.complaintsService.createComplaint(dto, user ,  dto.serviceId);
  }


  @Get("/my")
  async findAll(@Query() query , @Req() req ) {
    const { page, limit, search, sortBy, role, sortOrder } = query;
    return this.complaintsService.findAll(
      'complaints',
      search,
      page,
      limit,
      sortBy,
      sortOrder,
      [],
      ["user" , 'replies' , "service" ],
      [],
      {user : {id : req.user.id}}
    );
  }



  @Get(":serviceId/serivce")
  async findAllForProvider(@Query() query , @Param("serviceId") serviceId ) {
    const { page, limit, search, sortBy, role, sortOrder } = query;
    return this.complaintsService.findAll(
      'complaints',
      search,
      page,
      limit,
      sortBy,
      sortOrder,
      [],
      ["user" , 'replies' , "service"  ],
      [],
      {service : {id : serviceId}}
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.complaintsService.findOne(+id , ["user" , 'replies']);
  }


  @UseGuards(AuthGuard)
  @Post('reply')
  async addReply(@Body() dto: CreateReplyDto, @Req() req) {
    const user = req.user;
    return this.complaintsService.addReply(dto, user);
  }

}
