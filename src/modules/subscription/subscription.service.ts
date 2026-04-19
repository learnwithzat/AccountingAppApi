import { Injectable } from '@nestjs/common';
import { PrismaService } from './../../prisma/prisma.service';

@Injectable()
export class SubscriptionService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.client.subscription.create({ data });
  }

  findAll() {
    return this.prisma.client.subscription.findMany();
  }

  remove(id: string) {
    return this.prisma.client.subscription.delete({ where: { id } });
  }
}
