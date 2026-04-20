import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from './../../prisma/prisma.service';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  //////////////////////////////////////////////////////
  // CREATE ROLE (TENANT SAFE)
  //////////////////////////////////////////////////////
  async create(data: {
    name: string;
    type: any;
    tenantId: string;
    permissions?: string[];
  }) {
    const exists = await this.prisma.role.findFirst({
      where: {
        name: data.name,
        tenantId: data.tenantId,
      },
    });

    if (exists) {
      throw new ConflictException('Role already exists in this tenant');
    }

    return this.prisma.role.create({
      data: {
        name: data.name,
        type: data.type,
        tenantId: data.tenantId,

        //////////////////////////////////////////////////////
        // OPTIONAL: attach permissions on creation
        //////////////////////////////////////////////////////
        permissions: data.permissions?.length
          ? {
              create: data.permissions.map((permissionId) => ({
                permissionId,
              })),
            }
          : undefined,
      },
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    });
  }

  //////////////////////////////////////////////////////
  // GET ALL ROLES (TENANT SCOPED)
  //////////////////////////////////////////////////////
  async findAll(tenantId: string) {
    return this.prisma.role.findMany({
      where: { tenantId },
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
        _count: {
          select: {
            memberships: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  //////////////////////////////////////////////////////
  // GET SINGLE ROLE
  //////////////////////////////////////////////////////
  async findOne(roleId: string, tenantId: string) {
    return this.prisma.role.findFirst({
      where: {
        id: roleId,
        tenantId,
      },
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
        memberships: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  //////////////////////////////////////////////////////
  // UPDATE ROLE
  //////////////////////////////////////////////////////
  async update(roleId: string, tenantId: string, data: any) {
    return this.prisma.role.updateMany({
      where: {
        id: roleId,
        tenantId,
      },
      data,
    });
  }

  //////////////////////////////////////////////////////
  // DELETE ROLE (SAFE)
  //////////////////////////////////////////////////////
  async remove(roleId: string, tenantId: string) {
    return this.prisma.role.deleteMany({
      where: {
        id: roleId,
        tenantId,
      },
    });
  }

  //////////////////////////////////////////////////////
  // ASSIGN PERMISSIONS (IAM STYLE)
  //////////////////////////////////////////////////////
  async assignPermissions(roleId: string, permissionIds: string[]) {
    await this.prisma.rolePermission.deleteMany({
      where: { roleId },
    });

    return this.prisma.rolePermission.createMany({
      data: permissionIds.map((permissionId) => ({
        roleId,
        permissionId,
      })),
    });
  }
}
