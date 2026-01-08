import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order, OrderItem } from './entities/order.entity';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem]), CartModule],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
