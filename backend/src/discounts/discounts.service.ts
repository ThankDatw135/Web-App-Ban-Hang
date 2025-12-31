import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, MoreThanOrEqual, IsNull, Or } from 'typeorm';
import { Discount } from './entities/discount.entity';
import { ERROR_MESSAGES } from '../constants';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectRepository(Discount)
    private discountsRepository: Repository<Discount>,
  ) {}

  async findAll() {
    const discounts = await this.discountsRepository.find({
      order: { createdAt: 'DESC' },
    });

    return {
      data: discounts,
    };
  }

  async findOne(id: string) {
    const discount = await this.discountsRepository.findOne({ where: { id } });
    
    if (!discount) {
      throw new NotFoundException(ERROR_MESSAGES.DISCOUNT_NOT_FOUND);
    }

    return {
      data: discount,
    };
  }

  async validateCode(code: string, orderAmount: number) {
    const now = new Date();
    
    const discount = await this.discountsRepository.findOne({
      where: {
        code: code.toUpperCase(),
        active: true,
      },
    });

    if (!discount) {
      throw new NotFoundException(ERROR_MESSAGES.DISCOUNT_NOT_FOUND);
    }

    // Check date validity
    if (discount.startDate && discount.startDate > now) {
      throw new BadRequestException('Discount code is not yet active');
    }

    if (discount.endDate && discount.endDate < now) {
      throw new BadRequestException(ERROR_MESSAGES.DISCOUNT_EXPIRED);
    }

    // Check usage limit
    if (discount.maxUsageLimit && discount.usageCount >= discount.maxUsageLimit) {
      throw new BadRequestException(ERROR_MESSAGES.DISCOUNT_MAX_USES_REACHED);
    }

    // Check minimum order amount
    if (discount.minOrderAmount && orderAmount < Number(discount.minOrderAmount)) {
      throw new BadRequestException(
        `Minimum order amount is ${discount.minOrderAmount}`,
      );
    }

    // Calculate discount
    let discountAmount: number;
    if (discount.type === 'percentage') {
      discountAmount = (orderAmount * Number(discount.value)) / 100;
      if (discount.maxDiscountAmount && discountAmount > Number(discount.maxDiscountAmount)) {
        discountAmount = Number(discount.maxDiscountAmount);
      }
    } else {
      discountAmount = Number(discount.value);
    }

    return {
      data: {
        discount,
        discountAmount,
        finalAmount: orderAmount - discountAmount,
      },
    };
  }

  async create(createDiscountDto: any) {
    const existingDiscount = await this.discountsRepository.findOne({
      where: { code: createDiscountDto.code.toUpperCase() },
    });

    if (existingDiscount) {
      throw new BadRequestException('Discount code already exists');
    }

    const discount = this.discountsRepository.create({
      ...createDiscountDto,
      code: createDiscountDto.code.toUpperCase(),
    });

    await this.discountsRepository.save(discount);

    return {
      message: 'Discount created successfully',
      data: discount,
    };
  }

  async update(id: string, updateDiscountDto: any) {
    const discount = await this.discountsRepository.findOne({ where: { id } });
    
    if (!discount) {
      throw new NotFoundException(ERROR_MESSAGES.DISCOUNT_NOT_FOUND);
    }

    Object.assign(discount, updateDiscountDto);
    await this.discountsRepository.save(discount);

    return {
      message: 'Discount updated successfully',
      data: discount,
    };
  }

  async remove(id: string) {
    const discount = await this.discountsRepository.findOne({ where: { id } });
    
    if (!discount) {
      throw new NotFoundException(ERROR_MESSAGES.DISCOUNT_NOT_FOUND);
    }

    await this.discountsRepository.remove(discount);

    return {
      message: 'Discount deleted successfully',
    };
  }

  async incrementUsage(id: string) {
    await this.discountsRepository.increment({ id }, 'usageCount', 1);
  }
}
