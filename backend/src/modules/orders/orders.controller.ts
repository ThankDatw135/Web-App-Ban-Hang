import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto';
import { CurrentUser } from '../../common/decorators';
import { FirebaseAuthGuard } from '../../common/guards';

@ApiTags('orders')
@Controller('orders')
@UseGuards(FirebaseAuthGuard)
@ApiBearerAuth()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  async create(
    @CurrentUser('firebaseUid') firebaseUid: string,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.ordersService.create(firebaseUid, createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get user orders' })
  async findAll(@CurrentUser('firebaseUid') firebaseUid: string) {
    return this.ordersService.findByUser(firebaseUid);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  async findOne(
    @CurrentUser('firebaseUid') firebaseUid: string,
    @Param('id') id: string,
  ) {
    return this.ordersService.findById(firebaseUid, id);
  }
}
