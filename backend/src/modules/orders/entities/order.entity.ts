import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'order_number', unique: true })
  orderNumber: string;

  @Column({ name: 'total_amount', type: 'decimal', precision: 12, scale: 2 })
  totalAmount: number;

  @Column({ default: 'pending' })
  status: string;

  @Column({ name: 'payment_method' })
  paymentMethod: string;

  @Column({ name: 'payment_status', default: 'pending' })
  paymentStatus: string;

  @Column({ type: 'jsonb' })
  shippingAddress: Record<string, any>;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ name: 'discount_code', nullable: true })
  discountCode: string;

  @Column({ name: 'discount_amount', type: 'decimal', precision: 12, scale: 2, default: 0 })
  discountAmount: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'order_id' })
  orderId: string;

  @Column({ name: 'product_id' })
  productId: string;

  @Column()
  quantity: number;

  @Column({ nullable: true })
  size: string;

  @Column({ nullable: true })
  color: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  price: number;

  @Column({ name: 'product_name' })
  productName: string;

  @Column({ name: 'product_image', nullable: true })
  productImage: string;

  @ManyToOne(() => Order, (order) => order.items)
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
