import { IsString, IsNotEmpty, IsNumber, IsOptional, IsBoolean, IsArray, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({ example: 'Classic White Shirt' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Timeless white shirt crafted from premium cotton' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'clothing' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: 'shirts' })
  @IsString()
  @IsOptional()
  subcategory?: string;

  @ApiProperty({ example: 1500000 })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price: number;

  @ApiProperty({ example: 2000000, required: false })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  compareAtPrice?: number;

  @ApiProperty({ example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'] })
  @IsArray()
  @IsString({ each: true })
  images: string[];

  @ApiProperty({ 
    example: [{ size: 'M', stock: 10 }, { size: 'L', stock: 15 }],
    required: false 
  })
  @IsArray()
  @IsOptional()
  sizes?: { size: string; stock: number }[];

  @ApiProperty({ example: 25 })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  stock: number;

  @ApiProperty({ example: false, required: false })
  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @ApiProperty({ example: 'SHIRT-001', required: false })
  @IsString()
  @IsOptional()
  sku?: string;

  @ApiProperty({ example: '100% Premium Cotton', required: false })
  @IsString()
  @IsOptional()
  material?: string;
}

export class UpdateProductDto {
  @ApiProperty({ example: 'Classic White Shirt', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'Updated description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'clothing', required: false })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({ example: 'shirts', required: false })
  @IsString()
  @IsOptional()
  subcategory?: string;

  @ApiProperty({ example: 1500000, required: false })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  price?: number;

  @ApiProperty({ example: 2000000, required: false })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  compareAtPrice?: number;

  @ApiProperty({ example: ['https://example.com/image1.jpg'], required: false })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  images?: string[];

  @ApiProperty({ example: [{ size: 'M', stock: 10 }], required: false })
  @IsArray()
  @IsOptional()
  sizes?: { size: string; stock: number }[];

  @ApiProperty({ example: 25, required: false })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  stock?: number;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @ApiProperty({ example: 'SHIRT-001', required: false })
  @IsString()
  @IsOptional()
  sku?: string;

  @ApiProperty({ example: '100% Premium Cotton', required: false })
  @IsString()
  @IsOptional()
  material?: string;
}

export class ProductQueryDto {
  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  page?: number = 1;

  @ApiProperty({ example: 20, required: false })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  limit?: number = 20;

  @ApiProperty({ example: 'clothing', required: false })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({ example: 'shirts', required: false })
  @IsString()
  @IsOptional()
  subcategory?: string;

  @ApiProperty({ example: 'white shirt', required: false })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  featured?: boolean;
}
