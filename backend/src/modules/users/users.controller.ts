import { Controller, Get, Put, Body, UseGuards, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto';
import { CurrentUser } from '../../common/decorators';
import { FirebaseAuthGuard } from '../../common/guards';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'Returns current user profile' })
  async getProfile(@CurrentUser('firebaseUid') firebaseUid: string) {
    return this.usersService.findByFirebaseUid(firebaseUid);
  }

  @Put('me')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current user profile' })
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  async updateProfile(
    @CurrentUser('firebaseUid') firebaseUid: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(firebaseUid, updateUserDto);
  }

  @Put('me/password')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change password' })
  async changePassword(
    @CurrentUser('firebaseUid') firebaseUid: string,
    @Body('currentPassword') currentPassword: string,
    @Body('newPassword') newPassword: string,
  ) {
    return this.usersService.changePassword(firebaseUid, currentPassword, newPassword);
  }

  @Get('me/orders')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user order history' })
  async getOrderHistory(@CurrentUser('firebaseUid') firebaseUid: string) {
    return this.usersService.getOrderHistory(firebaseUid);
  }
}
