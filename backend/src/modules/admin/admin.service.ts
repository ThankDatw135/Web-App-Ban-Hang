import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { AdminUser } from './entities/admin-user.entity';
import { AdminLoginDto } from './dto';
import { Order } from '../orders/entities/order.entity';
import { Product } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';
import { comparePassword } from '../../common/utils';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminUser)
    private adminRepository: Repository<AdminUser>,
    private configService: ConfigService,
  ) {}

  async login(loginDto: AdminLoginDto): Promise<{ admin: Partial<AdminUser>; token: string }> {
    const admin = await this.adminRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await comparePassword(loginDto.password, admin.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: admin.role },
      this.configService.get('app.jwtSecret'),
      { expiresIn: '24h' },
    );

    const { passwordHash, ...adminWithoutPassword } = admin;
    return { admin: adminWithoutPassword, token };
  }

  async getDashboardStats(): Promise<any> {
    // TODO: Implement actual statistics queries
    return {
      totalOrders: 0,
      totalRevenue: 0,
      totalProducts: 0,
      totalUsers: 0,
      recentOrders: [],
    };
  }

  async getAllOrders(): Promise<Order[]> {
    // TODO: Implement with OrdersService
    return [];
  }

  async updateOrderStatus(orderId: string, status: string): Promise<Order> {
    // TODO: Implement with OrdersService
    return null;
  }
}
