import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto, UpdateProductDto, ProductFilterDto } from './dto';
import { PaginatedResult } from '../../common/types';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async findAll(filterDto: ProductFilterDto): Promise<PaginatedResult<Product>> {
    const { page = 1, limit = 20, category, subcategory, minPrice, maxPrice, search } = filterDto;
    
    const queryBuilder = this.productsRepository.createQueryBuilder('product');
    
    queryBuilder.where('product.isActive = :isActive', { isActive: true });

    if (category) {
      queryBuilder.andWhere('product.category = :category', { category });
    }

    if (subcategory) {
      queryBuilder.andWhere('product.subcategory = :subcategory', { subcategory });
    }

    if (minPrice) {
      queryBuilder.andWhere('product.price >= :minPrice', { minPrice });
    }

    if (maxPrice) {
      queryBuilder.andWhere('product.price <= :maxPrice', { maxPrice });
    }

    if (search) {
      queryBuilder.andWhere(
        '(LOWER(product.name) LIKE LOWER(:search) OR LOWER(product.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const [items, totalItems] = await queryBuilder
      .orderBy('product.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      items,
      meta: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        hasNextPage: page * limit < totalItems,
        hasPreviousPage: page > 1,
      },
    };
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async getFeatured(): Promise<Product[]> {
    return this.productsRepository.find({
      where: { featured: true, isActive: true },
      take: 10,
      order: { createdAt: 'DESC' },
    });
  }

  async getCategories(): Promise<string[]> {
    const result = await this.productsRepository
      .createQueryBuilder('product')
      .select('DISTINCT product.category', 'category')
      .getRawMany();

    return result.map((r) => r.category);
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(product);
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findById(id);
    Object.assign(product, updateProductDto);
    return this.productsRepository.save(product);
  }

  async delete(id: string): Promise<void> {
    const product = await this.findById(id);
    await this.productsRepository.remove(product);
  }
}
