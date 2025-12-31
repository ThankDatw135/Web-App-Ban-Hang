import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { BannersService } from './banners.service';

@ApiTags('Banners')
@Controller('banners')
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @Get()
  @ApiOperation({ summary: 'Get active banners' })
  @ApiQuery({ name: 'position', required: false, description: 'Filter by position (e.g., home, category)' })
  async findAll(@Query('position') position?: string) {
    return this.bannersService.findAll(position);
  }

  @Get('admin')
  @ApiOperation({ summary: 'Get all banners (admin)' })
  async findAllAdmin() {
    return this.bannersService.findAllAdmin();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get banner by ID' })
  async findOne(@Param('id') id: string) {
    return this.bannersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new banner' })
  async create(@Body() createBannerDto: any) {
    return this.bannersService.create(createBannerDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update banner' })
  async update(@Param('id') id: string, @Body() updateBannerDto: any) {
    return this.bannersService.update(id, updateBannerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete banner' })
  async remove(@Param('id') id: string) {
    return this.bannersService.remove(id);
  }
}
