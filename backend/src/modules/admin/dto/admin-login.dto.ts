import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AdminLoginDto {
  @ApiProperty({ example: 'admin@luxury.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'adminpassword123' })
  @IsString()
  @MinLength(6)
  password: string;
}
