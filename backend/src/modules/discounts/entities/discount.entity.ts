import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('discounts')
export class Discount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column({ name: 'discount_type' })
  discountType: string; // 'percentage' | 'fixed'

  @Column({ name: 'discount_value', type: 'decimal', precision: 12, scale: 2 })
  discountValue: number;

  @Column({ name: 'min_purchase', type: 'decimal', precision: 12, scale: 2, default: 0 })
  minPurchase: number;

  @Column({ name: 'max_discount', type: 'decimal', precision: 12, scale: 2, nullable: true })
  maxDiscount: number;

  @Column({ name: 'max_uses', nullable: true })
  maxUses: number;

  @Column({ name: 'used_count', default: 0 })
  usedCount: number;

  @Column({ name: 'valid_from', type: 'timestamp', nullable: true })
  validFrom: Date;

  @Column({ name: 'valid_until', type: 'timestamp', nullable: true })
  validUntil: Date;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
