import { IsString, IsNumber, IsOptional, IsArray, IsBoolean, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Elegant Silk Blouse' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Premium silk blouse with delicate detailing', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'clothing' })
  @IsString()
  category: string;

  @ApiProperty({ example: 'shirts', required: false })
  @IsOptional()
  @IsString()
  subcategory?: string;

  @ApiProperty({ example: 2500000 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 3000000, required: false })
  @IsOptional()
  @IsNumber()
  originalPrice?: number;

  @ApiProperty({ example: ['https://example.com/image1.jpg'], required: false })
  @IsOptional()
  @IsArray()
  images?: string[];

  @ApiProperty({ example: ['S', 'M', 'L', 'XL'], required: false })
  @IsOptional()
  @IsArray()
  sizes?: string[];

  @ApiProperty({ example: ['Black', 'White', 'Navy'], required: false })
  @IsOptional()
  @IsArray()
  colors?: string[];

  @ApiProperty({ example: 100, required: false })
  @IsOptional()
  @IsNumber()
  stock?: number;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;
}
