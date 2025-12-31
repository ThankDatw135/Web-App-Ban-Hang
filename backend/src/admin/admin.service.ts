import { Injectable, UnauthorizedException, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Order } from '../orders/entities/order.entity';
import { Product } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';
import { Admin, AdminRole } from './entities/admin.entity';
import { AdminLoginDto, CreateAdminDto, UpdateAdminDto } from './dto/admin-auth.dto';
import { JwtPayload } from '../common/strategies/jwt.strategy';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly jwtService: JwtService,
  ) {}

  // ============ Authentication Methods ============

  async login(loginDto: AdminLoginDto): Promise<{ access_token: string; admin: Partial<Admin> }> {
    const admin = await this.adminRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!admin.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, admin.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Update last login
    admin.lastLogin = new Date();
    await this.adminRepository.save(admin);

    const payload: JwtPayload = {
      sub: admin.id,
      email: admin.email,
      role: admin.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      admin: {
        id: admin.id,
        email: admin.email,
        fullName: admin.fullName,
        role: admin.role,
      },
    };
  }

  async createAdmin(createAdminDto: CreateAdminDto): Promise<Partial<Admin>> {
    // Check if admin already exists
    const existingAdmin = await this.adminRepository.findOne({
      where: { email: createAdminDto.email },
    });

    if (existingAdmin) {
      throw new ConflictException('Admin with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);

    const admin = this.adminRepository.create({
      ...createAdminDto,
      password: hashedPassword,
      role: createAdminDto.role || AdminRole.ADMIN,
    });

    await this.adminRepository.save(admin);

    return {
      id: admin.id,
      email: admin.email,
      fullName: admin.fullName,
      role: admin.role,
    };
  }

  async getAdminById(id: string): Promise<Partial<Admin>> {
    const admin = await this.adminRepository.findOne({ where: { id } });

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    return {
      id: admin.id,
      email: admin.email,
      fullName: admin.fullName,
      role: admin.role,
      isActive: admin.isActive,
      lastLogin: admin.lastLogin,
      createdAt: admin.createdAt,
    };
  }

  async updateAdmin(id: string, updateAdminDto: UpdateAdminDto): Promise<Partial<Admin>> {
    const admin = await this.adminRepository.findOne({ where: { id } });

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    Object.assign(admin, updateAdminDto);
    await this.adminRepository.save(admin);

    return {
      id: admin.id,
      email: admin.email,
      fullName: admin.fullName,
      role: admin.role,
      isActive: admin.isActive,
    };
  }

  async getAllAdmins(): Promise<Partial<Admin>[]> {
    const admins = await this.adminRepository.find({
      order: { createdAt: 'DESC' },
    });

    return admins.map((admin) => ({
      id: admin.id,
      email: admin.email,
      fullName: admin.fullName,
      role: admin.role,
      isActive: admin.isActive,
      lastLogin: admin.lastLogin,
      createdAt: admin.createdAt,
    }));
  }

  // ============ Dashboard Methods ============

  async getDashboardStats() {
    const [totalUsers, totalProducts, totalOrders] = await Promise.all([
      this.userRepository.count(),
      this.productRepository.count(),
      this.orderRepository.count(),
    ]);

    const revenueResult = await this.orderRepository
      .createQueryBuilder('order')
      .select('SUM(order.total)', 'totalRevenue')
      .getRawOne();

    return {
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue: parseFloat(revenueResult?.totalRevenue || '0'),
    };
  }

  async getAllOrders(query?: { status?: string; page?: number; limit?: number }) {
    const page = query?.page || 1;
    const limit = query?.limit || 20;
    const skip = (page - 1) * limit;

    const queryBuilder = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.items', 'items')
      .orderBy('order.createdAt', 'DESC');

    if (query?.status) {
      queryBuilder.where('order.status = :status', { status: query.status });
    }

    const [data, total] = await queryBuilder.skip(skip).take(limit).getManyAndCount();

    return { data, total, page, limit };
  }

  async getAllProducts(query?: { category?: string; page?: number; limit?: number }) {
    const page = query?.page || 1;
    const limit = query?.limit || 20;
    const skip = (page - 1) * limit;

    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .orderBy('product.createdAt', 'DESC');

    if (query?.category) {
      queryBuilder.where('product.category = :category', { category: query.category });
    }

    const [data, total] = await queryBuilder.skip(skip).take(limit).getManyAndCount();

    return { data, total, page, limit };
  }

  async getAllCustomers(query?: { page?: number; limit?: number }) {
    const page = query?.page || 1;
    const limit = query?.limit || 20;
    const skip = (page - 1) * limit;

    const [data, total] = await this.userRepository
      .createQueryBuilder('user')
      .orderBy('user.createdAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return { data, total, page, limit };
  }

  // ============ Seed Admin ============

  async seedDefaultAdmin(): Promise<void> {
    const existingAdmin = await this.adminRepository.findOne({
      where: { email: 'admin@luxuryfashion.com' },
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const admin = this.adminRepository.create({
        email: 'admin@luxuryfashion.com',
        password: hashedPassword,
        fullName: 'Super Admin',
        role: AdminRole.SUPER_ADMIN,
      });
      await this.adminRepository.save(admin);
      console.log('Default admin created: admin@luxuryfashion.com / admin123');
    }
  }
}
