/** @format */

import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from './../../prisma/prisma.service';

@Injectable()
export class MembershipService {
  constructor(private prisma: PrismaService) {}

  //////////////////////////////////////////////////////
  // CREATE MEMBERSHIP (USER → TENANT → ROLE)
  //////////////////////////////////////////////////////
  async create(data: { userId: string; tenantId: string; roleId: string }) {
    //////////////////////////////////////////////////////
    // PREVENT DUPLICATE MEMBERSHIP
    //////////////////////////////////////////////////////
    const exists = await this.prisma.membership.findFirst({
      where: {
        userId: data.userId,
        tenantId: data.tenantId,
      },
    });

    if (exists) {
      throw new ConflictException('User already in this tenant');
    }

    return this.prisma.membership.create({
      data: {
        userId: data.userId,
        tenantId: data.tenantId,
        roleId: data.roleId,
        isActive: true,
      },
      include: {
        user: true,
        tenant: true,
        role: {
          include: {
            permissions: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    });
  }

  //////////////////////////////////////////////////////
  // GET ALL (GLOBAL ADMIN VIEW)
  //////////////////////////////////////////////////////
  findAll() {
    return this.prisma.membership.findMany({
      include: {
        user: true,
        tenant: true,
        role: true,
      },
    });
  }

  //////////////////////////////////////////////////////
  // GET BY TENANT (IMPORTANT FOR SAAS SCOPING)
  //////////////////////////////////////////////////////
  findByTenant(tenantId: string) {
    return this.prisma.membership.findMany({
      where: { tenantId },
      include: {
        user: true,
        role: true,
      },
    });
  }

  //////////////////////////////////////////////////////
  // GET USER TENANTS (SWITCH WORKSPACE FEATURE)
  //////////////////////////////////////////////////////
  findUserTenants(userId: string) {
    return this.prisma.membership.findMany({
      where: {
        userId,
        isActive: true,
      },
      include: {
        tenant: true,
        role: true,
      },
    });
  }

  //////////////////////////////////////////////////////
  // DEACTIVATE MEMBERSHIP (SOFT REMOVE)
  //////////////////////////////////////////////////////
  async deactivate(id: string) {
    return this.prisma.membership.update({
      where: { id },
      data: {
        isActive: false,
      },
    });
  }
}
