import { Controller, Get, Post, Put, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/order.dto';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';

@ApiTags('Orders')
@Controller('orders')
@UseGuards(FirebaseAuthGuard)
@ApiBearerAuth()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create order from cart' })
  async createOrder(@Request() req, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(req.user.uid, createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get user order history' })
  async getOrders(@Request() req) {
    return this.ordersService.getUserOrders(req.user.uid);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order details' })
  async getOrder(@Request() req, @Param('id') id: string) {
    return this.ordersService.getOrderDetails(req.user.uid, id);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Update order status (Admin only)' })
  async updateOrderStatus(
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.ordersService.updateOrderStatus(id, updateOrderStatusDto);
  }
}
