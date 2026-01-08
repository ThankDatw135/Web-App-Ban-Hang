import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminUser } from './entities/admin-user.entity';
import { ProductsModule } from '../products/products.module';
import { OrdersModule } from '../orders/orders.module';
import { DiscountsModule } from '../discounts/discounts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminUser]),
    ProductsModule,
    OrdersModule,
    DiscountsModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
