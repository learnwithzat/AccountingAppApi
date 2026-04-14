/** @format */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './order.entity';
import { CustomerService } from '../customers/customer.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private readonly customerService: CustomerService,
  ) {}

  async updateStatus(
    companyId: string,
    id: string,
    status: string,
  ): Promise<OrderEntity> {
    const order = await this.orderRepository.findOne({
      where: { id, companyId },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const previousStatus = order.status;
    order.status = status;
    const savedOrder = await this.orderRepository.save(order);

    // Trigger customer statistics update when order is confirmed for the first time
    if (
      status === 'confirmed' &&
      previousStatus !== 'confirmed' &&
      order.customerId
    ) {
      await this.customerService.updateStatistics(
        companyId,
        order.customerId,
        Number(order.total),
        order.orderDate.toISOString(),
      );
    }

    return savedOrder;
  }
}
