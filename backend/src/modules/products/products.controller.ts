import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto, ProductFilterDto } from './dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products with filters' })
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async findAll(@Query() filterDto: ProductFilterDto) {
    return this.productsService.findAll(filterDto);
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured products' })
  async getFeatured() {
    return this.productsService.getFeatured();
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get all product categories' })
  async getCategories() {
    return this.productsService.getCategories();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiResponse({ status: 200, description: 'Product found' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async findOne(@Param('id') id: string) {
    return this.productsService.findById(id);
  }
}
