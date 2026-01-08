import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderItem } from './entities/order.entity';
import { CreateOrderDto } from './dto';
import { CartService } from '../cart/cart.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
    private cartService: CartService,
  ) {}

  async create(userId: string, createOrderDto: CreateOrderDto): Promise<Order> {
    const cartItems = await this.cartService.getCart(userId);

    if (cartItems.length === 0) {
      throw new NotFoundException('Cart is empty');
    }

    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );

    const order = this.ordersRepository.create({
      userId,
      orderNumber: `ORD-${Date.now()}-${uuidv4().slice(0, 8).toUpperCase()}`,
      totalAmount,
      paymentMethod: createOrderDto.paymentMethod,
      shippingAddress: createOrderDto.shippingAddress,
      notes: createOrderDto.notes,
    });

    const savedOrder = await this.ordersRepository.save(order);

    // Create order items
    const orderItems = cartItems.map((item) =>
      this.orderItemsRepository.create({
        orderId: savedOrder.id,
        productId: item.productId,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        price: item.product.price,
        productName: item.product.name,
        productImage: item.product.images?.[0],
      }),
    );

    await this.orderItemsRepository.save(orderItems);

    // Clear cart
    await this.cartService.clearCart(userId);

    return this.findById(userId, savedOrder.id);
  }

  async findByUser(userId: string): Promise<Order[]> {
    return this.ordersRepository.find({
      where: { userId },
      relations: ['items'],
      order: { createdAt: 'DESC' },
    });
  }

  async findById(userId: string, id: string): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id, userId },
      relations: ['items'],
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async updateStatus(id: string, status: string): Promise<Order> {
    const order = await this.ordersRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    order.status = status;
    return this.ordersRepository.save(order);
  }
}
