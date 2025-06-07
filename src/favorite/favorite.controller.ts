import { Controller, Post, Delete, Get, Body, Param, Req, UseGuards, Query } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateFavoriteDto } from 'dto/favorite.dto';

@UseGuards(AuthGuard)
@Controller('favorites')
export class FavoriteController {
  constructor(private readonly favService: FavoriteService) {}

  @Post()
  addFavorite(@Body() dto: CreateFavoriteDto, @Req() req) {
    return this.favService.addFavorite(req.user.id, dto);
  }

  @Delete(':serviceId')
  removeFavorite(@Param('serviceId') serviceId: number, @Req() req) {
    return this.favService.remove(+serviceId);
  }

  @Get("my")
  getFavorites(@Query() query , @Req() req ) {
    const userId = req.user.id
    const { page, limit, search, sortBy, role, sortOrder } = query;
    return this.favService.findAll(
      'favorite',
      search,
      page,
      limit,
      sortBy,
      sortOrder,
      [],
      ["user" , "service" ], // relations
      ['name'],// search
      {user : {id : userId}}
    );
  }
}
