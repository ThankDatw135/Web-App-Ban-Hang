import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { User } from '../users/entities/user.entity';
import { CartItem } from '../cart/entities/cart-item.entity';
import { Product } from '../products/entities/product.entity';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/order.dto';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../constants';
import { generateOrderNumber } from '../utils/helpers';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(CartItem)
    private cartItemsRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private dataSource: DataSource,
    private rabbitMQService: RabbitMQService,
  ) {}

  async createOrder(firebaseUid: string, createOrderDto: CreateOrderDto) {
    // Get user
    const user = await this.usersRepository.findOne({
      where: { firebaseUid },
    });

    if (!user) {
      throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    // Get cart items
    const cartItems = await this.cartItemsRepository.find({
      where: { userId: user.id },
      relations: ['product'],
    });

    if (cartItems.length === 0) {
      throw new BadRequestException(ERROR_MESSAGES.CART_EMPTY);
    }

    // Validate stock for all items
    for (const item of cartItems) {
      if (item.product.stock < item.quantity) {
        throw new BadRequestException(`Insufficient stock for ${item.product.name}`);
      }
    }

    // Calculate totals
    const totalAmount = cartItems.reduce((sum, item) => {
      return sum + (Number(item.product.price) * item.quantity);
    }, 0);

    let discountAmount = 0;
    // TODO: Apply discount code if provided
    const finalAmount = totalAmount - discountAmount;

    // Generate order number
    const orderNumber = generateOrderNumber();

    // Use transaction to ensure data consistency
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Create order
      const order = this.ordersRepository.create({
        userId: user.id,
        orderNumber,
        totalAmount,
        discountAmount,
        finalAmount,
        paymentMethod: createOrderDto.paymentMethod,
        shippingAddress: createOrderDto.shippingAddress,
        notes: createOrderDto.notes,
        platform: createOrderDto.platform || 'web',
        status: 'pending',
        paymentStatus: 'pending',
      });

      const savedOrder = await queryRunner.manager.save(order);

      // Create order items and update product stock
      for (const cartItem of cartItems) {
        // Create order item with product snapshot
        const orderItem = this.orderItemsRepository.create({
          orderId: savedOrder.id,
          productId: cartItem.productId,
          quantity: cartItem.quantity,
          size: cartItem.size,
          price: cartItem.product.price,
          subtotal: Number(cartItem.product.price) * cartItem.quantity,
          productSnapshot: {
            name: cartItem.product.name,
            images: cartItem.product.images,
            description: cartItem.product.description,
          },
        });

        await queryRunner.manager.save(orderItem);

        // Update product stock
        cartItem.product.stock -= cartItem.quantity;
        await queryRunner.manager.save(cartItem.product);
      }

      // Clear cart
      await queryRunner.manager.delete(CartItem, { userId: user.id });

      await queryRunner.commitTransaction();

      // Publish order created event to RabbitMQ
      try {
        await this.rabbitMQService.publishOrderEvent('order_created', {
          orderId: savedOrder.id,
          orderNumber: savedOrder.orderNumber,
          userId: user.id,
          userEmail: user.email,
          totalAmount: savedOrder.totalAmount,
          finalAmount: savedOrder.finalAmount,
          itemCount: cartItems.length,
        });
        this.logger.debug(`Order ${savedOrder.orderNumber} event published to RabbitMQ`);
      } catch (error) {
        this.logger.warn(`Failed to publish order event to RabbitMQ: ${error.message}`);
      }

      return {
        message: SUCCESS_MESSAGES.ORDER_CREATED,
        data: {
          orderId: savedOrder.id,
          orderNumber: savedOrder.orderNumber,
          totalAmount: savedOrder.totalAmount,
          finalAmount: savedOrder.finalAmount,
        },
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getUserOrders(firebaseUid: string) {
    // Get user
    const user = await this.usersRepository.findOne({
      where: { firebaseUid },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Get orders with items
    const orders = await this.ordersRepository.find({
      where: { userId: user.id },
      relations: ['items'],
      order: { createdAt: 'DESC' },
    });

    return {
      data: orders.map(order => ({
        id: order.id,
        orderNumber: order.orderNumber,
        totalAmount: order.totalAmount,
        finalAmount: order.finalAmount,
        status: order.status,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        itemCount: order.items.length,
        createdAt: order.createdAt,
      })),
    };
  }

  async getOrderDetails(firebaseUid: string, orderId: string) {
    // Get user
    const user = await this.usersRepository.findOne({
      where: { firebaseUid },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Get order with items
    const order = await this.ordersRepository.findOne({
      where: { id: orderId, userId: user.id },
      relations: ['items', 'items.product'],
    });

    if (!order) {
      throw new NotFoundException(ERROR_MESSAGES.ORDER_NOT_FOUND);
    }

    return {
      data: {
        ...order,
        items: order.items.map(item => ({
          id: item.id,
          productId: item.productId,
          productSnapshot: item.productSnapshot,
          quantity: item.quantity,
          size: item.size,
          price: item.price,
          subtotal: item.subtotal,
          currentProduct: item.product ? {
            id: item.product.id,
            name: item.product.name,
            slug: item.product.slug,
            images: item.product.images,
          } : null,
        })),
      },
    };
  }

  async updateOrderStatus(orderId: string, updateOrderStatusDto: UpdateOrderStatusDto) {
    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
      relations: ['user'],
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const previousStatus = order.status;
    order.status = updateOrderStatusDto.status;

    // Auto-update payment status for certain order statuses
    if (updateOrderStatusDto.status === 'delivered') {
      order.paymentStatus = 'paid';
    }

    await this.ordersRepository.save(order);

    // Publish order status updated event to RabbitMQ
    try {
      await this.rabbitMQService.publishOrderEvent('order_status_updated', {
        orderId: order.id,
        orderNumber: order.orderNumber,
        userId: order.userId,
        previousStatus,
        newStatus: order.status,
        paymentStatus: order.paymentStatus,
      });
      this.logger.debug(`Order ${order.orderNumber} status update published to RabbitMQ`);
    } catch (error) {
      this.logger.warn(`Failed to publish order status update to RabbitMQ: ${error.message}`);
    }

    return {
      message: SUCCESS_MESSAGES.ORDER_UPDATED,
      data: order,
    };
  }
}
