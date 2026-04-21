/** @format */

import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from './../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  username?: string;
}

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  //////////////////////////////////////////////////////
  // CREATE USER (SAAS SAFE)
  //////////////////////////////////////////////////////
  async create(data: CreateUserDto) {
    if (!data.name?.trim() || !data.email?.trim() || !data.password) {
      throw new BadRequestException('Missing required fields');
    }

    const email = data.email.toLowerCase().trim();

    if (!email.includes('@')) {
      throw new BadRequestException('Invalid email');
    }

    if (data.password.length < 6) {
      throw new BadRequestException('Password too weak');
    }

    const baseUsername = (
      data.username?.trim() || email.split('@')[0]
    ).toLowerCase();

    const hashedPassword = await bcrypt.hash(data.password, 10);

    //////////////////////////////////////////////////////
    // SAFE USER CREATION WITH RETRY (NO RACE CONDITION)
    //////////////////////////////////////////////////////
    let attempt = 0;
    let username = baseUsername;

    while (attempt < 5) {
      try {
        return await this.prisma.user.create({
          data: {
            name: data.name.trim(),
            email,
            username,
            password: hashedPassword,
          },
          select: {
            id: true,
            name: true,
            email: true,
            username: true,
            createdAt: true,
          },
        });
      } catch (err: any) {
        //////////////////////////////////////////////////////
        // UNIQUE CONSTRAINT ERROR
        //////////////////////////////////////////////////////
        if (err.code === 'P2002') {
          const target = err.meta?.target;

          if (target?.includes('email')) {
            throw new ConflictException('Email already exists');
          }

          if (target?.includes('username')) {
            attempt++;
            username = `${baseUsername}${attempt}`;
            continue;
          }

          throw new ConflictException('User already exists');
        }

        throw err;
      }
    }

    throw new ConflictException('Could not generate unique username');
  }

  //////////////////////////////////////////////////////
  // GET USERS BY TENANT (SAAS SAFE VIEW)
  //////////////////////////////////////////////////////
  findAll(tenantId: string) {
    return this.prisma.user.findMany({
      where: {
        memberships: {
          some: {
            tenantId,
            isActive: true,
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        createdAt: true,
        memberships: {
          where: {
            tenantId,
          },
          select: {
            id: true,
            role: {
              select: {
                id: true,
                name: true,
                type: true,
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
        },
      },
    });
  }

  //////////////////////////////////////////////////////
  // DELETE USER (HARD DELETE - CONSIDER SOFT DELETE)
  //////////////////////////////////////////////////////
  async remove(id: string) {
    if (!id) {
      throw new BadRequestException('User ID required');
    }

    return this.prisma.user.delete({
      where: { id },
    });
  }
}
