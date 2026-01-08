import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private repository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.repository.find({ where: { isActive: true } });
  }

  async findById(id: string): Promise<Product | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findByCategory(category: string): Promise<Product[]> {
    return this.repository.find({ where: { category, isActive: true } });
  }

  async findFeatured(): Promise<Product[]> {
    return this.repository.find({ where: { featured: true, isActive: true } });
  }

  async create(productData: Partial<Product>): Promise<Product> {
    const product = this.repository.create(productData);
    return this.repository.save(product);
  }

  async update(id: string, productData: Partial<Product>): Promise<Product> {
    await this.repository.update(id, productData);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
