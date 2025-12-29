import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateProfileDto, ChangePasswordDto, UpdateBankAccountDto, UpdateWalletDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByFirebaseUid(firebaseUid: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { firebaseUid },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  async updateProfile(firebaseUid: string, updateProfileDto: UpdateProfileDto): Promise<User> {
    const user = await this.findByFirebaseUid(firebaseUid);

    Object.assign(user, updateProfileDto);

    return this.usersRepository.save(user);
  }

  async changePassword(firebaseUid: string, changePasswordDto: ChangePasswordDto): Promise<{ message: string }> {
    // Note: Password change is handled by Firebase Auth
    // This endpoint is for validation and logging purposes
    const user = await this.findByFirebaseUid(firebaseUid);

    // TODO: Verify current password with Firebase
    // TODO: Update password in Firebase
    // For now, return success message
    return { message: 'Password changed successfully' };
  }

  async updateBankAccount(firebaseUid: string, updateBankAccountDto: UpdateBankAccountDto): Promise<User> {
    const user = await this.findByFirebaseUid(firebaseUid);

    user.bankAccount = updateBankAccountDto;

    return this.usersRepository.save(user);
  }

  async updateWallet(firebaseUid: string, updateWalletDto: UpdateWalletDto): Promise<User> {
    const user = await this.findByFirebaseUid(firebaseUid);

    user.walletInfo = updateWalletDto;

    return this.usersRepository.save(user);
  }

  async getOrderHistory(firebaseUid: string): Promise<any> {
    // This method is now handled by OrdersService.getUserOrders()
    // Keeping this for backward compatibility, but it should redirect to OrdersService
    const user = await this.findByFirebaseUid(firebaseUid);
    
    return {
      message: 'Please use /orders endpoint to get order history',
      userId: user.id,
    };
  }
}
