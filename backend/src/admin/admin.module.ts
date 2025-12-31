import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin } from './entities/admin.entity';
import { Order } from '../orders/entities/order.entity';
import { Product } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';
import { JwtStrategy } from '../common/strategies/jwt.strategy';
import { CONFIG } from '../config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, Order, Product, User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: CONFIG.JWT.SECRET,
      signOptions: { expiresIn: CONFIG.JWT.EXPIRES_IN as any },
    }),
  ],
  controllers: [AdminController],
  providers: [AdminService, JwtStrategy],
  exports: [AdminService, JwtModule, PassportModule],
})
export class AdminModule {}
