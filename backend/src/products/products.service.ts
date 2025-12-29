import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, ILike } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto, UpdateProductDto, ProductQueryDto } from './dto/product.dto';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../constants';
import { generateSlug, calculatePagination } from '../utils/helpers';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async findAll(query: ProductQueryDto) {
    const { page = 1, limit = 20, category, subcategory, search, featured } = query;

    const queryBuilder = this.productsRepository.createQueryBuilder('product');

    // Only show active products
    queryBuilder.where('product.active = :active', { active: true });

    // Apply filters
    if (category) {
      queryBuilder.andWhere('product.category = :category', { category });
    }

    if (subcategory) {
      queryBuilder.andWhere('product.subcategory = :subcategory', { subcategory });
    }

    if (search) {
      queryBuilder.andWhere(
        '(product.name ILIKE :search OR product.description ILIKE :search)',
        { search: `%${search}%` }
      );
    }

    if (featured !== undefined) {
      queryBuilder.andWhere('product.featured = :featured', { featured });
    }

    // Pagination
    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    // Order by created date (newest first)
    queryBuilder.orderBy('product.createdAt', 'DESC');

    const [products, total] = await queryBuilder.getManyAndCount();

    return {
      data: products,
      pagination: calculatePagination(page, limit, total),
    };
  }

  async getFeatured() {
    const products = await this.productsRepository.find({
      where: { featured: true, active: true },
      order: { createdAt: 'DESC' },
      take: 12,
    });

    return { data: products };
  }

  async getCategories() {
    const categories = await this.productsRepository
      .createQueryBuilder('product')
      .select('DISTINCT product.category', 'category')
      .addSelect('product.subcategory', 'subcategory')
      .where('product.active = :active', { active: true })
      .getRawMany();

    // Group by category
    const grouped = categories.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      if (item.subcategory && !acc[item.category].includes(item.subcategory)) {
        acc[item.category].push(item.subcategory);
      }
      return acc;
    }, {});

    return { data: grouped };
  }

  async findOne(id: string) {
    const product = await this.productsRepository.findOne({
      where: { id, active: true },
    });

    if (!product) {
      throw new NotFoundException(ERROR_MESSAGES.PRODUCT_NOT_FOUND);
    }

    return { data: product };
  }

  async create(createProductDto: CreateProductDto) {
    const slug = generateSlug(createProductDto.name);

    const product = this.productsRepository.create({
      ...createProductDto,
      slug,
    });

    const savedProduct = await this.productsRepository.save(product);

    return {
      message: SUCCESS_MESSAGES.PRODUCT_CREATED,
      data: savedProduct,
    };
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productsRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(ERROR_MESSAGES.PRODUCT_NOT_FOUND);
    }

    // Update slug if name changed
    if (updateProductDto.name && updateProductDto.name !== product.name) {
      updateProductDto['slug'] = generateSlug(updateProductDto.name);
    }

    Object.assign(product, updateProductDto);

    const updatedProduct = await this.productsRepository.save(product);

    return {
      message: SUCCESS_MESSAGES.PRODUCT_UPDATED,
      data: updatedProduct,
    };
  }

  async remove(id: string) {
    const product = await this.productsRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(ERROR_MESSAGES.PRODUCT_NOT_FOUND);
    }

    // Soft delete by setting active to false
    product.active = false;
    await this.productsRepository.save(product);

    return {
      message: SUCCESS_MESSAGES.PRODUCT_DELETED,
    };
  }
}
