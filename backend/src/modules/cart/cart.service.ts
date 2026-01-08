import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './entities/cart-item.entity';
import { AddToCartDto, UpdateCartDto } from './dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private cartRepository: Repository<CartItem>,
  ) {}

  async getCart(userId: string): Promise<CartItem[]> {
    return this.cartRepository.find({
      where: { userId },
      relations: ['product'],
    });
  }

  async addToCart(userId: string, addToCartDto: AddToCartDto): Promise<CartItem> {
    const existing = await this.cartRepository.findOne({
      where: {
        userId,
        productId: addToCartDto.productId,
        size: addToCartDto.size,
        color: addToCartDto.color,
      },
    });

    if (existing) {
      existing.quantity += addToCartDto.quantity || 1;
      return this.cartRepository.save(existing);
    }

    const cartItem = this.cartRepository.create({
      userId,
      ...addToCartDto,
    });
    return this.cartRepository.save(cartItem);
  }

  async updateCartItem(userId: string, id: string, updateCartDto: UpdateCartDto): Promise<CartItem> {
    const cartItem = await this.cartRepository.findOne({
      where: { id, userId },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    cartItem.quantity = updateCartDto.quantity;
    return this.cartRepository.save(cartItem);
  }

  async removeFromCart(userId: string, id: string): Promise<void> {
    const result = await this.cartRepository.delete({ id, userId });
    if (result.affected === 0) {
      throw new NotFoundException('Cart item not found');
    }
  }

  async clearCart(userId: string): Promise<void> {
    await this.cartRepository.delete({ userId });
  }
}
