import { Injectable } from '@nestjs/common';
import { PrismaService } from './../../prisma/prisma.service';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.client.company.create({ data });
  }

  findAll() {
    return this.prisma.client.company.findMany();
  }
}
