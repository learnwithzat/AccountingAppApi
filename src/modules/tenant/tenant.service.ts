/** @format */

import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from './../../prisma/prisma.service';
import {
  Prisma,
  RoleType,
  Tenant,
  TenantStatus,
} from '../../../prisma/generated/client';

@Injectable()
export class TenantService {
  constructor(private prisma: PrismaService) {}

  //////////////////////////////////////////////////////
  // CREATE TENANT WITH OWNER (SAAS CORE FLOW)
  //////////////////////////////////////////////////////
  async createTenantWithOwner(
    userId: string,
    data: Prisma.TenantCreateInput,
  ): Promise<Tenant> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        //////////////////////////////////////////////////////
        // NORMALIZE SLUG (IMPORTANT FOR SAAS)
        //////////////////////////////////////////////////////
        const normalizedData: Prisma.TenantCreateInput = {
          ...data,
          slug: data.slug?.toString().toLowerCase().trim(),
          status: TenantStatus.ACTIVE,
        };

        //////////////////////////////////////////////////////
        // CREATE TENANT
        //////////////////////////////////////////////////////
        const tenant = await tx.tenant.create({
          data: normalizedData,
        });

        //////////////////////////////////////////////////////
        // CREATE DEFAULT ROLES (SEQUENTIAL - SAFE)
        //////////////////////////////////////////////////////
        const ownerRole = await tx.role.create({
          data: {
            name: 'Owner',
            type: RoleType.OWNER,
            tenantId: tenant.id,
          },
        });

        await tx.role.createMany({
          data: [
            { name: 'Admin', type: RoleType.ADMIN, tenantId: tenant.id },
            { name: 'Manager', type: RoleType.MANAGER, tenantId: tenant.id },
            { name: 'Staff', type: RoleType.STAFF, tenantId: tenant.id },
          ],
        });

        //////////////////////////////////////////////////////
        // CREATE OWNER MEMBERSHIP
        //////////////////////////////////////////////////////
        await tx.membership.create({
          data: {
            userId,
            tenantId: tenant.id,
            roleId: ownerRole.id,
            isActive: true,
          },
        });

        //////////////////////////////////////////////////////
        // DEFAULT COMPANY
        //////////////////////////////////////////////////////
        await tx.company.create({
          data: {
            name: `${tenant.name} Company`,
            tenantId: tenant.id,
          },
        });

        return tenant;
      });
    } catch (err: any) {
      if (err.code === 'P2002') {
        throw new ConflictException('Tenant slug already exists');
      }
      throw err;
    }
  }

  //////////////////////////////////////////////////////
  // GET ALL TENANTS
  //////////////////////////////////////////////////////
  async findAll() {
    return this.prisma.tenant.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        slug: true,
        status: true,
        createdAt: true,
      },
    });
  }

  //////////////////////////////////////////////////////
  // GET SINGLE TENANT (FULL DETAILS)
  //////////////////////////////////////////////////////
  async findOne(id: string): Promise<Tenant> {
    const tenant = await this.prisma.tenant.findUnique({
      where: { id },
      include: {
        roles: true,
        companies: true,
        branches: true,
        subscriptions: true,
      },
    });

    if (!tenant) throw new NotFoundException('Tenant not found');

    return tenant;
  }

  //////////////////////////////////////////////////////
  // UPDATE TENANT
  //////////////////////////////////////////////////////
  async update(id: string, data: Prisma.TenantUpdateInput): Promise<Tenant> {
    await this.findOne(id);

    try {
      return await this.prisma.tenant.update({
        where: { id },
        data: {
          ...data,
          slug: data.slug?.toString().toLowerCase().trim(),
        },
      });
    } catch (err: any) {
      if (err.code === 'P2002') {
        throw new ConflictException('Tenant slug already exists');
      }
      throw err;
    }
  }

  //////////////////////////////////////////////////////
  // DELETE TENANT
  //////////////////////////////////////////////////////
  async remove(id: string): Promise<Tenant> {
    await this.findOne(id);

    return this.prisma.tenant.delete({
      where: { id },
    });
  }

  //////////////////////////////////////////////////////
  // USER TENANTS (WORKSPACE SWITCHING)
  //////////////////////////////////////////////////////
  async getUserTenants(userId: string) {
    return this.prisma.membership.findMany({
      where: {
        userId,
        isActive: true,
      },
      include: {
        tenant: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        role: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  //////////////////////////////////////////////////////
  // USER CONTEXT (RBAC CORE)
  //////////////////////////////////////////////////////
  async getUserContext(userId: string, tenantId: string) {
    const membership = await this.prisma.membership.findFirst({
      where: {
        userId,
        tenantId,
        isActive: true,
      },
      include: {
        role: {
          include: {
            permissions: {
              include: {
                permission: true,
              },
            },
          },
        },
        tenant: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    if (!membership) {
      throw new NotFoundException('No access to this tenant');
    }

    return membership;
  }
}
