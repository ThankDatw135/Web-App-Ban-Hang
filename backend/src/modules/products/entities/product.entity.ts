import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  category: string;

  @Column({ nullable: true })
  subcategory: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  price: number;

  @Column({ name: 'original_price', type: 'decimal', precision: 12, scale: 2, nullable: true })
  originalPrice: number;

  @Column({ type: 'jsonb', default: [] })
  images: string[];

  @Column({ type: 'jsonb', default: [] })
  sizes: string[];

  @Column({ type: 'jsonb', default: [] })
  colors: string[];

  @Column({ default: 0 })
  stock: number;

  @Column({ default: false })
  featured: boolean;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ nullable: true })
  brand: string;

  @Column({ nullable: true })
  material: string;

  @Column({ type: 'jsonb', nullable: true })
  specifications: Record<string, any>;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
