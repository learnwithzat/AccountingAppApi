/** @format */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { OrderService } from './order.service';
import { CustomerModule } from '../customers/customer.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity]), CustomerModule],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
