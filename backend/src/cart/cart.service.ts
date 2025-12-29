import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './entities/cart-item.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { AddToCartDto, UpdateCartItemDto } from './dto/cart.dto';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../constants';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private cartItemsRepository: Repository<CartItem>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async getCart(firebaseUid: string) {
    // Get user
    const user = await this.usersRepository.findOne({
      where: { firebaseUid },
    });

    if (!user) {
      throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    // Get cart items with product details
    const cartItems = await this.cartItemsRepository.find({
      where: { userId: user.id },
      relations: ['product'],
      order: { createdAt: 'DESC' },
    });

    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => {
      return sum + (Number(item.product.price) * item.quantity);
    }, 0);

    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return {
      data: {
        items: cartItems.map(item => ({
          id: item.id,
          productId: item.productId,
          product: {
            id: item.product.id,
            name: item.product.name,
            slug: item.product.slug,
            price: item.product.price,
            images: item.product.images,
            stock: item.product.stock,
          },
          quantity: item.quantity,
          size: item.size,
          subtotal: Number(item.product.price) * item.quantity,
        })),
        summary: {
          itemCount,
          subtotal,
        },
      },
    };
  }

  async addToCart(firebaseUid: string, addToCartDto: AddToCartDto) {
    // Get user
    const user = await this.usersRepository.findOne({
      where: { firebaseUid },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if product exists
    const product = await this.productsRepository.findOne({
      where: { id: addToCartDto.productId, active: true },
    });

    if (!product) {
      throw new NotFoundException(ERROR_MESSAGES.PRODUCT_NOT_FOUND);
    }

    // Check stock
    if (product.stock < addToCartDto.quantity) {
      throw new BadRequestException(ERROR_MESSAGES.INSUFFICIENT_STOCK);
    }

    // Check if item already exists in cart
    const existingItem = await this.cartItemsRepository.findOne({
      where: {
        userId: user.id,
        productId: addToCartDto.productId,
        size: addToCartDto.size || null,
      },
    });

    if (existingItem) {
      // Update quantity
      existingItem.quantity += addToCartDto.quantity;

      // Check stock again
      if (product.stock < existingItem.quantity) {
        throw new BadRequestException('Insufficient stock');
      }

      await this.cartItemsRepository.save(existingItem);

      return {
        message: SUCCESS_MESSAGES.CART_UPDATED,
        data: existingItem,
      };
    }

    // Create new cart item
    const cartItem = this.cartItemsRepository.create({
      userId: user.id,
      productId: addToCartDto.productId,
      quantity: addToCartDto.quantity,
      size: addToCartDto.size,
    });

    await this.cartItemsRepository.save(cartItem);

    return {
      message: SUCCESS_MESSAGES.ITEM_ADDED_TO_CART,
      data: cartItem,
    };
  }

  async updateCartItem(firebaseUid: string, cartItemId: string, updateCartItemDto: UpdateCartItemDto) {
    // Get user
    const user = await this.usersRepository.findOne({
      where: { firebaseUid },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Get cart item
    const cartItem = await this.cartItemsRepository.findOne({
      where: { id: cartItemId, userId: user.id },
      relations: ['product'],
    });

    if (!cartItem) {
      throw new NotFoundException(ERROR_MESSAGES.CART_ITEM_NOT_FOUND);
    }

    // Check stock
    if (cartItem.product.stock < updateCartItemDto.quantity) {
      throw new BadRequestException('Insufficient stock');
    }

    cartItem.quantity = updateCartItemDto.quantity;
    await this.cartItemsRepository.save(cartItem);

    return {
      message: SUCCESS_MESSAGES.CART_UPDATED,
      data: cartItem,
    };
  }

  async removeCartItem(firebaseUid: string, cartItemId: string) {
    // Get user
    const user = await this.usersRepository.findOne({
      where: { firebaseUid },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Get cart item
    const cartItem = await this.cartItemsRepository.findOne({
      where: { id: cartItemId, userId: user.id },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    await this.cartItemsRepository.remove(cartItem);

    return {
      message: SUCCESS_MESSAGES.ITEM_REMOVED_FROM_CART,
    };
  }

  async clearCart(firebaseUid: string) {
    // Get user
    const user = await this.usersRepository.findOne({
      where: { firebaseUid },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.cartItemsRepository.delete({ userId: user.id });

    return {
      message: SUCCESS_MESSAGES.CART_CLEARED,
    };
  }
}
