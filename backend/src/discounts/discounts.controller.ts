import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { DiscountsService } from './discounts.service';

@ApiTags('Discounts')
@Controller('discounts')
export class DiscountsController {
  constructor(private readonly discountsService: DiscountsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all discounts' })
  async findAll() {
    return this.discountsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get discount by ID' })
  async findOne(@Param('id') id: string) {
    return this.discountsService.findOne(id);
  }

  @Post('validate')
  @ApiOperation({ summary: 'Validate discount code' })
  async validateCode(
    @Body() body: { code: string; orderAmount: number },
  ) {
    return this.discountsService.validateCode(body.code, body.orderAmount);
  }

  @Post()
  @ApiOperation({ summary: 'Create new discount' })
  async create(@Body() createDiscountDto: any) {
    return this.discountsService.create(createDiscountDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update discount' })
  async update(@Param('id') id: string, @Body() updateDiscountDto: any) {
    return this.discountsService.update(id, updateDiscountDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete discount' })
  async remove(@Param('id') id: string) {
    return this.discountsService.remove(id);
  }
}
