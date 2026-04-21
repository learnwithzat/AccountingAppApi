/** @format */

import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from './../../prisma/prisma.service';

@Injectable()
export class MembershipService {
  constructor(private prisma: PrismaService) {}

  //////////////////////////////////////////////////////
  // CREATE MEMBERSHIP (USER → TENANT → ROLE)
  //////////////////////////////////////////////////////
  async create(data: { userId: string; tenantId: string; roleId: string }) {
    const { userId, tenantId, roleId } = data;

    return this.prisma.$transaction(async (tx) => {
      //////////////////////////////////////////////////////
      // CHECK USER
      //////////////////////////////////////////////////////
      const user = await tx.user.findUnique({
        where: { id: userId },
      });
      if (!user) throw new NotFoundException('User not found');

      //////////////////////////////////////////////////////
      // CHECK TENANT
      //////////////////////////////////////////////////////
      const tenant = await tx.tenant.findUnique({
        where: { id: tenantId },
      });
      if (!tenant) throw new NotFoundException('Tenant not found');

      //////////////////////////////////////////////////////
      // CHECK ROLE
      //////////////////////////////////////////////////////
      const role = await tx.role.findUnique({
        where: { id: roleId },
      });
      if (!role) throw new NotFoundException('Role not found');

      //////////////////////////////////////////////////////
      // PREVENT DUPLICATE MEMBERSHIP
      //////////////////////////////////////////////////////
      const exists = await tx.membership.findFirst({
        where: {
          userId,
          tenantId,
        },
      });

      if (exists) {
        throw new ConflictException('User already belongs to this tenant');
      }

      //////////////////////////////////////////////////////
      // CREATE MEMBERSHIP
      //////////////////////////////////////////////////////
      return tx.membership.create({
        data: {
          userId,
          tenantId,
          roleId,
          isActive: true,
        },
        include: {
          user: {
            select: { id: true, email: true, name: true },
          },
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
    });
  }

  //////////////////////////////////////////////////////
  // GET ALL (ADMIN VIEW - LIGHTER)
  //////////////////////////////////////////////////////
  findAll() {
    return this.prisma.membership.findMany({
      include: {
        user: {
          select: { id: true, email: true, name: true },
        },
        tenant: {
          select: { id: true, name: true },
        },
        role: {
          select: { id: true, name: true },
        },
      },
    });
  }

  //////////////////////////////////////////////////////
  // GET BY TENANT (SAAS SCOPING)
  //////////////////////////////////////////////////////
  findByTenant(tenantId: string) {
    return this.prisma.membership.findMany({
      where: { tenantId },
      include: {
        user: {
          select: { id: true, email: true, name: true },
        },
        role: true,
      },
    });
  }

  //////////////////////////////////////////////////////
  // GET USER TENANTS (WORKSPACE SWITCHING)
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
  // DEACTIVATE MEMBERSHIP (SOFT DELETE)
  //////////////////////////////////////////////////////
  async deactivate(id: string) {
    const membership = await this.prisma.membership.findUnique({
      where: { id },
    });

    if (!membership) {
      throw new NotFoundException('Membership not found');
    }

    return this.prisma.membership.update({
      where: { id },
      data: {
        isActive: false,
      },
    });
  }
}
