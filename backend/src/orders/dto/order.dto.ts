import { IsString, IsNotEmpty, IsOptional, IsObject, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class ShippingAddressDto {
  @ApiProperty({ example: 'Nguyen Van A' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: '+84123456789' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: '123 Main Street' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: 'Ho Chi Minh City' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: 'District 1' })
  @IsString()
  @IsNotEmpty()
  district: string;

  @ApiProperty({ example: 'Ward 1' })
  @IsString()
  @IsNotEmpty()
  ward: string;

  @ApiProperty({ example: '700000', required: false })
  @IsString()
  @IsOptional()
  postalCode?: string;
}

export class CreateOrderDto {
  @ApiProperty({ example: 'cod' })
  @IsString()
  @IsNotEmpty()
  paymentMethod: string;

  @ApiProperty({ type: ShippingAddressDto })
  @IsObject()
  @ValidateNested()
  @Type(() => ShippingAddressDto)
  shippingAddress: ShippingAddressDto;

  @ApiProperty({ example: 'DISCOUNT10', required: false })
  @IsString()
  @IsOptional()
  discountCode?: string;

  @ApiProperty({ example: 'Please deliver after 5 PM', required: false })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({ example: 'web', required: false })
  @IsString()
  @IsOptional()
  platform?: string;
}

export class UpdateOrderStatusDto {
  @ApiProperty({ example: 'confirmed' })
  @IsString()
  @IsNotEmpty()
  status: string;
}
