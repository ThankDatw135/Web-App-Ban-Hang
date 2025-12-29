import { getRepository } from 'typeorm';
import { CartItem } from '../cart/entities/cart-item.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { AppError } from '../utils/errors';
import { HTTP_STATUS } from '../constants';

export class CartService {
  async getCart(firebaseUid: string) {
    const userRepo = getRepository(User);
    const cartRepo = getRepository(CartItem);

    const user = await userRepo.findOne({ where: { firebaseUid } });
    if (!user) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, 'User not found');
    }

    const cartItems = await cartRepo.find({
      where: { userId: user.id },
      relations: ['product'],
      order: { createdAt: 'DESC' },
    });

    const subtotal = cartItems.reduce((sum, item) => {
      return sum + (Number(item.product.price) * item.quantity);
    }, 0);

    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return {
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
      summary: { itemCount, subtotal },
    };
  }

  async addToCart(firebaseUid: string, data: any) {
    const userRepo = getRepository(User);
    const productRepo = getRepository(Product);
    const cartRepo = getRepository(CartItem);

    const user = await userRepo.findOne({ where: { firebaseUid } });
    if (!user) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, 'User not found');
    }

    const product = await productRepo.findOne({ where: { id: data.productId, active: true } });
    if (!product) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, 'Product not found');
    }

    if (product.stock < data.quantity) {
      throw new AppError(HTTP_STATUS.BAD_REQUEST, 'Insufficient stock');
    }

    // Check existing item
    const existingItem = await cartRepo.findOne({
      where: { userId: user.id, productId: data.productId, size: data.size || null },
    });

    if (existingItem) {
      existingItem.quantity += data.quantity;
      if (product.stock < existingItem.quantity) {
        throw new AppError(HTTP_STATUS.BAD_REQUEST, 'Insufficient stock');
      }
      await cartRepo.save(existingItem);
      return existingItem;
    }

    const cartItem = cartRepo.create({
      userId: user.id,
      productId: data.productId,
      quantity: data.quantity,
      size: data.size,
    });

    await cartRepo.save(cartItem);
    return cartItem;
  }

  async updateCartItem(firebaseUid: string, cartItemId: string, data: any) {
    const userRepo = getRepository(User);
    const cartRepo = getRepository(CartItem);

    const user = await userRepo.findOne({ where: { firebaseUid } });
    if (!user) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, 'User not found');
    }

    const cartItem = await cartRepo.findOne({
      where: { id: cartItemId, userId: user.id },
      relations: ['product'],
    });

    if (!cartItem) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, 'Cart item not found');
    }

    if (cartItem.product.stock < data.quantity) {
      throw new AppError(HTTP_STATUS.BAD_REQUEST, 'Insufficient stock');
    }

    cartItem.quantity = data.quantity;
    await cartRepo.save(cartItem);

    return cartItem;
  }

  async removeCartItem(firebaseUid: string, cartItemId: string) {
    const userRepo = getRepository(User);
    const cartRepo = getRepository(CartItem);

    const user = await userRepo.findOne({ where: { firebaseUid } });
    if (!user) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, 'User not found');
    }

    const cartItem = await cartRepo.findOne({ where: { id: cartItemId, userId: user.id } });
    if (!cartItem) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, 'Cart item not found');
    }

    await cartRepo.remove(cartItem);
    return { message: 'Item removed from cart' };
  }

  async clearCart(firebaseUid: string) {
    const userRepo = getRepository(User);
    const cartRepo = getRepository(CartItem);

    const user = await userRepo.findOne({ where: { firebaseUid } });
    if (!user) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, 'User not found');
    }

    await cartRepo.delete({ userId: user.id });
    return { message: 'Cart cleared' };
  }
}
