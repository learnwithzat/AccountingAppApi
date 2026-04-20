import { Injectable } from '@nestjs/common';
import { PrismaService } from './../../prisma/prisma.service';

@Injectable()
export class SubscriptionService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.subscription.create({ data });
  }

  findAll() {
    return this.prisma.subscription.findMany();
  }

  remove(id: string) {
    return this.prisma.subscription.delete({ where: { id } });
  }
}
