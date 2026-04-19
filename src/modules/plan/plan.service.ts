import { Injectable } from '@nestjs/common';
import { PrismaService } from './../../prisma/prisma.service';

@Injectable()
export class PlanService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.client.plan.create({ data });
  }

  findAll() {
    return this.prisma.client.plan.findMany();
  }
}
