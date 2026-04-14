/** @format */

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid' })
  companyId: string;

  @Index()
  @Column({ type: 'uuid', nullable: true })
  customerId: string;

  @Column()
  orderNumber: string;

  @Column({ type: 'timestamp with time zone' })
  orderDate: Date;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  total: number;

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
