/** @format */

import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from './../../prisma/prisma.service';
import { RoleType } from '../../generated/prisma/client';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  //////////////////////////////////////////////////////
  // CREATE ROLE (TENANT SAFE + CASE INSENSITIVE)
  //////////////////////////////////////////////////////
  async create(data: {
    name: string;
    type: RoleType;
    tenantId: string;
    permissions?: string[];
  }) {
    const name = data.name.trim();

    const exists = await this.prisma.role.findFirst({
      where: {
        tenantId: data.tenantId,
        name: {
          equals: name,
          mode: 'insensitive',
        },
      },
    });

    if (exists) {
      throw new ConflictException('Role already exists in this tenant');
    }

    return this.prisma.role.create({
      data: {
        name,
        type: data.type,
        tenantId: data.tenantId,

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
  // GET SINGLE ROLE (SAFE)
  //////////////////////////////////////////////////////
  async findOne(roleId: string, tenantId: string) {
    const role = await this.prisma.role.findFirst({
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
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return role;
  }

  //////////////////////////////////////////////////////
  // UPDATE ROLE (SAFE + VERIFIED)
  //////////////////////////////////////////////////////
  async update(roleId: string, tenantId: string, data: any) {
    const role = await this.prisma.role.findFirst({
      where: {
        id: roleId,
        tenantId,
      },
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return this.prisma.role.update({
      where: { id: roleId },
      data,
    });
  }

  //////////////////////////////////////////////////////
  // DELETE ROLE (SAFE + PROTECTED)
  //////////////////////////////////////////////////////
  async remove(roleId: string, tenantId: string) {
    const role = await this.prisma.role.findFirst({
      where: {
        id: roleId,
        tenantId,
      },
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return this.prisma.role.delete({
      where: { id: roleId },
    });
  }

  //////////////////////////////////////////////////////
  // ASSIGN PERMISSIONS (TENANT SAFE IAM)
  //////////////////////////////////////////////////////
  async assignPermissions(roleId: string, permissionIds: string[]) {
    if (!permissionIds?.length) {
      throw new BadRequestException('No permissions provided');
    }

    const role = await this.prisma.role.findUnique({
      where: { id: roleId },
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    //////////////////////////////////////////////////////
    // VERIFY PERMISSIONS EXIST
    //////////////////////////////////////////////////////
    const permissions = await this.prisma.permission.findMany({
      where: {
        id: {
          in: permissionIds,
        },
      },
    });

    if (permissions.length !== permissionIds.length) {
      throw new BadRequestException('Invalid permission IDs detected');
    }

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
