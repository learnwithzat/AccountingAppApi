/** @format */

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import type { CustomerStatus, CustomerType } from './customer.types';

@Entity('customers')
export class CustomerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid' })
  companyId: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  company?: string;

  @Index()
  @Column()
  email: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  alternativePhone?: string;

  @Column({
    type: 'enum',
    enum: ['individual', 'business', 'non_profit', 'government'],
    default: 'individual',
  })
  type: CustomerType;

  @Column({
    type: 'enum',
    enum: ['active', 'inactive', 'suspended', 'pending'],
    default: 'active',
  })
  status: CustomerStatus;

  @Column({ nullable: true })
  taxId?: string;

  @Column({ nullable: true })
  website?: string;

  // Addresses
  @Column({ nullable: true }) billingAddress?: string;
  @Column({ nullable: true }) billingCity?: string;
  @Column({ nullable: true }) billingState?: string;
  @Column({ nullable: true }) billingPostalCode?: string;
  @Column({ nullable: true }) billingCountry?: string;

  @Column({ nullable: true }) shippingAddress?: string;
  @Column({ nullable: true }) shippingCity?: string;
  @Column({ nullable: true }) shippingState?: string;
  @Column({ nullable: true }) shippingPostalCode?: string;
  @Column({ nullable: true }) shippingCountry?: string;

  // Additional Info
  @Column({ type: 'text', nullable: true })
  notes?: string;

  @Column('text', { array: true, default: '{}' })
  tags: string[];

  // Statistics
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  lifetimeSpent: number;

  @Column({ type: 'int', default: 0 })
  totalOrders: number;

  @Column({ type: 'timestamp with time zone', nullable: true })
  lastOrderDate?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
