import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discount } from './entities/discount.entity';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectRepository(Discount)
    private discountsRepository: Repository<Discount>,
  ) {}

  async validateCode(code: string, subtotal: number): Promise<{ valid: boolean; discount?: number; message?: string }> {
    const discount = await this.discountsRepository.findOne({
      where: { code: code.toUpperCase(), active: true },
    });

    if (!discount) {
      return { valid: false, message: 'Invalid discount code' };
    }

    const now = new Date();
    if (discount.validFrom && now < discount.validFrom) {
      return { valid: false, message: 'Discount code is not yet active' };
    }

    if (discount.validUntil && now > discount.validUntil) {
      return { valid: false, message: 'Discount code has expired' };
    }

    if (discount.maxUses && discount.usedCount >= discount.maxUses) {
      return { valid: false, message: 'Discount code usage limit reached' };
    }

    if (subtotal < discount.minPurchase) {
      return { valid: false, message: `Minimum purchase of ${discount.minPurchase} required` };
    }

    let discountAmount: number;
    if (discount.discountType === 'percentage') {
      discountAmount = (subtotal * discount.discountValue) / 100;
      if (discount.maxDiscount && discountAmount > discount.maxDiscount) {
        discountAmount = discount.maxDiscount;
      }
    } else {
      discountAmount = discount.discountValue;
    }

    return { valid: true, discount: discountAmount };
  }

  async useCode(code: string): Promise<void> {
    await this.discountsRepository.increment({ code: code.toUpperCase() }, 'usedCount', 1);
  }
}
