/* 



  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.bannerService.update(+id, dto);
  }



  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }




  findAll(@Query() query) {
    const { page, limit, search, sortBy, role, sortOrder } = query;
    return this.categoryService.findAll(
      '',
      search,
      page,
      limit,
      sortBy,
      sortOrder,
      [],
      [], // relations
      ['name'],// search
    );
  }


*/