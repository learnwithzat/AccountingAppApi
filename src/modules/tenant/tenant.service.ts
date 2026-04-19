import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from './../../prisma/prisma.service';
import { Prisma, Tenant, RoleType } from '../../../generated/prisma/client';

@Injectable()
export class TenantService {
  constructor(private prisma: PrismaService) {}

  //////////////////////////////////////////////////////
  // CREATE TENANT WITH OWNER (MAIN METHOD)
  //////////////////////////////////////////////////////
  async createTenantWithOwner(
    userId: string,
    data: Prisma.TenantCreateInput,
  ): Promise<Tenant> {
    try {
      return await this.prisma.client.$transaction(async (tx) => {
        // 1. CREATE TENANT
        const tenant = await tx.tenant.create({
          data: {
            ...data,
            status: 'ACTIVE',
          },
        });

        // 2. CREATE DEFAULT ROLES
        const roles = await Promise.all([
          tx.role.create({
            data: {
              name: 'Owner',
              type: RoleType.OWNER,
              tenantId: tenant.id,
            },
          }),
          tx.role.create({
            data: {
              name: 'Admin',
              type: RoleType.ADMIN,
              tenantId: tenant.id,
            },
          }),
          tx.role.create({
            data: {
              name: 'Manager',
              type: RoleType.MANAGER,
              tenantId: tenant.id,
            },
          }),
          tx.role.create({
            data: {
              name: 'Staff',
              type: RoleType.STAFF,
              tenantId: tenant.id,
            },
          }),
        ]);

        // 3. FIND OWNER ROLE
        const ownerRole = roles.find((r) => r.type === RoleType.OWNER);
        if (!ownerRole) {
          throw new Error('Owner role creation failed');
        }

        // 4. CREATE MEMBERSHIP (OWNER)
        await tx.membership.create({
          data: {
            userId,
            tenantId: tenant.id,
            roleId: ownerRole.id,
          },
        });

        // 5. OPTIONAL: DEFAULT COMPANY
        await tx.company.create({
          data: {
            name: `${data.name} Company`,
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
  // GET ALL TENANTS (ADMIN PURPOSE)
  //////////////////////////////////////////////////////
  async findAll(): Promise<Tenant[]> {
    return this.prisma.client.tenant.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  //////////////////////////////////////////////////////
  // GET TENANT BY ID (FULL DETAILS)
  //////////////////////////////////////////////////////
  async findOne(id: string): Promise<Tenant> {
    const tenant = await this.prisma.client.tenant.findUnique({
      where: { id },
      include: {
        roles: true,
        companies: true,
        branches: true,
        subscriptions: true,
      },
    });

    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    return tenant;
  }

  //////////////////////////////////////////////////////
  // UPDATE TENANT
  //////////////////////////////////////////////////////
  async update(id: string, data: Prisma.TenantUpdateInput): Promise<Tenant> {
    await this.findOne(id);

    try {
      return await this.prisma.client.tenant.update({
        where: { id },
        data,
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

    return this.prisma.client.tenant.delete({
      where: { id },
    });
  }

  //////////////////////////////////////////////////////
  // GET TENANTS FOR USER (IMPORTANT)
  //////////////////////////////////////////////////////
  async getUserTenants(userId: string) {
    return this.prisma.client.membership.findMany({
      where: {
        userId,
        isActive: true,
      },
      include: {
        tenant: true,
        role: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  //////////////////////////////////////////////////////
  // GET USER CONTEXT (RBAC CORE)
  //////////////////////////////////////////////////////
  async getUserContext(userId: string, tenantId: string) {
    const membership = await this.prisma.client.membership.findFirst({
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
        tenant: true,
      },
    });

    if (!membership) {
      throw new NotFoundException(
        'User is not part of this tenant or inactive',
      );
    }

    return membership;
  }
}
