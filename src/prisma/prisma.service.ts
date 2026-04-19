import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { prisma } from './prisma.client';

@Injectable()
export class PrismaService implements OnModuleDestroy {
  client = prisma;
  tenant: any;

  async onModuleDestroy() {
    await this.client.$disconnect();
  }
}
