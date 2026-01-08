import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddToCartDto, UpdateCartDto } from './dto';
import { CurrentUser } from '../../common/decorators';
import { FirebaseAuthGuard } from '../../common/guards';

@ApiTags('cart')
@Controller('cart')
@UseGuards(FirebaseAuthGuard)
@ApiBearerAuth()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @ApiOperation({ summary: 'Get user cart' })
  async getCart(@CurrentUser('firebaseUid') firebaseUid: string) {
    return this.cartService.getCart(firebaseUid);
  }

  @Post('items')
  @ApiOperation({ summary: 'Add item to cart' })
  async addToCart(
    @CurrentUser('firebaseUid') firebaseUid: string,
    @Body() addToCartDto: AddToCartDto,
  ) {
    return this.cartService.addToCart(firebaseUid, addToCartDto);
  }

  @Put('items/:id')
  @ApiOperation({ summary: 'Update cart item quantity' })
  async updateCartItem(
    @CurrentUser('firebaseUid') firebaseUid: string,
    @Param('id') id: string,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    return this.cartService.updateCartItem(firebaseUid, id, updateCartDto);
  }

  @Delete('items/:id')
  @ApiOperation({ summary: 'Remove item from cart' })
  async removeFromCart(
    @CurrentUser('firebaseUid') firebaseUid: string,
    @Param('id') id: string,
  ) {
    return this.cartService.removeFromCart(firebaseUid, id);
  }

  @Delete()
  @ApiOperation({ summary: 'Clear cart' })
  async clearCart(@CurrentUser('firebaseUid') firebaseUid: string) {
    return this.cartService.clearCart(firebaseUid);
  }
}
