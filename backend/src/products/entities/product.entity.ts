import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  category: string;

  @Column({ nullable: true })
  subcategory: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true, name: 'compare_at_price' })
  compareAtPrice: number;

  @Column({ type: 'jsonb' })
  images: string[];

  @Column({ type: 'jsonb', nullable: true })
  sizes: { size: string; stock: number }[];

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ default: false })
  featured: boolean;

  @Column({ default: true })
  active: boolean;

  @Column({ unique: true, nullable: true })
  sku: string;

  @Column({ nullable: true })
  material: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
