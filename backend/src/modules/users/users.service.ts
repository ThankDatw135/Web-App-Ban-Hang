import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';
import { hashPassword, comparePassword } from '../../common/utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findByFirebaseUid(firebaseUid: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { firebaseUid } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(firebaseUid: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findByFirebaseUid(firebaseUid);
    
    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async changePassword(
    firebaseUid: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<{ message: string }> {
    const user = await this.findByFirebaseUid(firebaseUid);

    if (!user.password) {
      throw new BadRequestException('User does not have a password set');
    }

    const isValid = await comparePassword(currentPassword, user.password);
    if (!isValid) {
      throw new BadRequestException('Current password is incorrect');
    }

    user.password = await hashPassword(newPassword);
    await this.usersRepository.save(user);

    return { message: 'Password changed successfully' };
  }

  async getOrderHistory(firebaseUid: string): Promise<any[]> {
    // TODO: Implement order history with relations
    return [];
  }

  async delete(id: string): Promise<void> {
    const user = await this.findById(id);
    await this.usersRepository.remove(user);
  }
}
