import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { OrderItem } from './order-item.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ unique: true, name: 'order_number' })
  orderNumber: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, name: 'total_amount' })
  totalAmount: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0, name: 'discount_amount' })
  discountAmount: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, name: 'final_amount' })
  finalAmount: number;

  @Column({ default: 'pending' })
  status: string;

  @Column({ name: 'payment_method' })
  paymentMethod: string;

  @Column({ default: 'pending', name: 'payment_status' })
  paymentStatus: string;

  @Column({ type: 'jsonb', name: 'shipping_address' })
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    district: string;
    ward: string;
    postalCode?: string;
  };

  @Column({ type: 'jsonb', nullable: true, name: 'customer_info' })
  customerInfo: any;

  @Column({ nullable: true, name: 'discount_code_id' })
  discountCodeId: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ default: 'web' })
  platform: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => OrderItem, orderItem => orderItem.order, { cascade: true })
  items: OrderItem[];
}
