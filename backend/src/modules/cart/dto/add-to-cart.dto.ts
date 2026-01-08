import { IsUUID, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddToCartDto {
  @ApiProperty()
  @IsUUID()
  productId: string;

  @ApiProperty({ required: false, default: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  quantity?: number = 1;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  size?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  color?: string;
}
