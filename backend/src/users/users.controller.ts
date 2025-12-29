import { Controller, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateProfileDto, ChangePasswordDto, UpdateBankAccountDto, UpdateWalletDto } from './dto/user.dto';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';

@ApiTags('Users')
@Controller('users')
@UseGuards(FirebaseAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  async getCurrentUser(@Request() req) {
    return this.usersService.findByFirebaseUid(req.user.uid);
  }

  @Put('me')
  @ApiOperation({ summary: 'Update current user profile' })
  async updateProfile(@Request() req, @Body() updateProfileDto: UpdateProfileDto) {
    return this.usersService.updateProfile(req.user.uid, updateProfileDto);
  }

  @Put('me/password')
  @ApiOperation({ summary: 'Change password' })
  async changePassword(@Request() req, @Body() changePasswordDto: ChangePasswordDto) {
    return this.usersService.changePassword(req.user.uid, changePasswordDto);
  }

  @Put('me/bank-account')
  @ApiOperation({ summary: 'Update bank account info' })
  async updateBankAccount(@Request() req, @Body() updateBankAccountDto: UpdateBankAccountDto) {
    return this.usersService.updateBankAccount(req.user.uid, updateBankAccountDto);
  }

  @Put('me/wallet')
  @ApiOperation({ summary: 'Update wallet info' })
  async updateWallet(@Request() req, @Body() updateWalletDto: UpdateWalletDto) {
    return this.usersService.updateWallet(req.user.uid, updateWalletDto);
  }

  @Get('me/orders')
  @ApiOperation({ summary: 'Get user order history' })
  async getOrderHistory(@Request() req) {
    return this.usersService.getOrderHistory(req.user.uid);
  }
}
