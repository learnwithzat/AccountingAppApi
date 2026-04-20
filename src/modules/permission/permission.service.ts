/** @format */

import { Injectable } from '@nestjs/common';
import { PrismaService } from './../../prisma/prisma.service';

@Injectable()
export class PermissionService {
  constructor(private prisma: PrismaService) {}

  //////////////////////////////////////////////////////
  // GET ALL PERMISSIONS (GLOBAL CATALOG)
  //////////////////////////////////////////////////////
  findAll() {
    return this.prisma.permission.findMany({
      orderBy: {
        key: 'asc',
      },
    });
  }

  //////////////////////////////////////////////////////
  // CREATE PERMISSION (ADMIN ONLY / SEED USE)
  //////////////////////////////////////////////////////
  create(data: { key: string; label: string }) {
    return this.prisma.permission.create({
      data,
    });
  }

  //////////////////////////////////////////////////////
  // BULK CREATE (FOR SEEDING RBAC)
  //////////////////////////////////////////////////////
  createMany(data: { key: string; label: string }[]) {
    return this.prisma.permission.createMany({
      data,
      skipDuplicates: true,
    });
  }
}
