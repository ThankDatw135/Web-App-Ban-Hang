import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { AdminLoginDto } from './dto';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { Roles } from '../../common/decorators';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Admin login' })
  async login(@Body() loginDto: AdminLoginDto) {
    return this.adminService.login(loginDto);
  }

  @Get('dashboard')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'super_admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get dashboard statistics' })
  async getDashboard() {
    return this.adminService.getDashboardStats();
  }

  @Get('orders')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'super_admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all orders' })
  async getOrders() {
    return this.adminService.getAllOrders();
  }

  @Put('orders/:id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'super_admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update order status' })
  async updateOrderStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.adminService.updateOrderStatus(id, status);
  }
}
