/** @format */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { Customer, CustomerStatus } from './customer.types';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}

  async findAll(companyId: string): Promise<CustomerEntity[]> {
    return this.customerRepository.find({
      where: { companyId },
      order: { name: 'ASC' },
    });
  }

  async findOne(companyId: string, id: string): Promise<CustomerEntity> {
    const customer = await this.customerRepository.findOne({
      where: { id, companyId },
    });
    if (!customer) throw new NotFoundException('Customer not found');
    return customer;
  }

  async create(
    companyId: string,
    data: Partial<Customer>,
  ): Promise<CustomerEntity> {
    const customer = this.customerRepository.create({ ...data, companyId });
    return this.customerRepository.save(customer);
  }

  async update(
    companyId: string,
    id: string,
    data: Partial<Customer>,
  ): Promise<CustomerEntity> {
    const customer = await this.findOne(companyId, id);
    Object.assign(customer, data);
    return this.customerRepository.save(customer);
  }

  async updateStatus(
    companyId: string,
    id: string,
    status: CustomerStatus,
  ): Promise<CustomerEntity> {
    const customer = await this.findOne(companyId, id);
    customer.status = status;
    return this.customerRepository.save(customer);
  }

  async remove(companyId: string, id: string): Promise<void> {
    const result = await this.customerRepository.delete({ id, companyId });
    if (result.affected === 0)
      throw new NotFoundException('Customer not found');
  }

  async bulkDelete(companyId: string, ids: string[]): Promise<void> {
    await this.customerRepository.delete({ id: In(ids), companyId });
  }

  async updateStatistics(
    companyId: string,
    id: string,
    orderAmount: number,
    orderDate: string,
  ): Promise<void> {
    const customer = await this.findOne(companyId, id);

    customer.totalOrders += 1;
    customer.lifetimeSpent = Number(customer.lifetimeSpent) + orderAmount;
    customer.lastOrderDate = orderDate;

    await this.customerRepository.save(customer);
  }
}
