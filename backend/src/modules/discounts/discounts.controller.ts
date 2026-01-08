import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { DiscountsService } from './discounts.service';
import { ValidateDiscountDto } from './dto';

@ApiTags('discounts')
@Controller('discounts')
export class DiscountsController {
  constructor(private readonly discountsService: DiscountsService) {}

  @Post('validate')
  @ApiOperation({ summary: 'Validate a discount code' })
  async validate(@Body() validateDto: ValidateDiscountDto) {
    return this.discountsService.validateCode(validateDto.code, validateDto.subtotal);
  }
}
