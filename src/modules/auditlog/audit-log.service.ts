import { Injectable } from '@nestjs/common';
import { PrismaService } from './../../prisma/prisma.service';

@Injectable()
export class AuditLogService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.auditLog.create({ data });
  }


  findAll() {
    return this.prisma.auditLog.findMany();
  }
}
