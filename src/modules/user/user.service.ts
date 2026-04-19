import { Injectable, BadRequestException } from '@nestjs/common';
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

  async create(data: CreateUserDto) {
    // =========================
    // VALIDATION
    // =========================
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

    // =========================
    // USERNAME GENERATION
    // =========================
    const baseUsername = (
      data.username?.trim() || email.split('@')[0]
    ).toLowerCase();

    let username = baseUsername;

    // ⚡ OPTIMIZED: single query instead of loop
    const existingUsers = await this.prisma.client.user.findMany({
      where: {
        username: {
          startsWith: baseUsername,
        },
      },
      select: { username: true },
    });

    const usernameSet = new Set(existingUsers.map((u) => u.username));

    let counter = 1;
    while (usernameSet.has(username)) {
      username = `${baseUsername}${counter}`;
      counter++;
    }

    // =========================
    // HASH PASSWORD
    // =========================
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // =========================
    // CREATE USER
    // =========================
    try {
      return await this.prisma.client.user.create({
        data: {
          name: data.name.trim(),
          email,
          username,
          password: hashedPassword,
        },
      });
    } catch (err: any) {
      if (err.code === 'P2002') {
        throw new BadRequestException('Email or username already exists');
      }
      throw err;
    }
  }

  findAll(tenantId: string) {
    return this.prisma.client.user.findMany({
      where: {
        memberships: {
          some: {
            tenantId: tenantId, // 🔥 KEY FIX
          },
        },
      },
      include: {
        memberships: {
          where: {
            tenantId: tenantId, // only current tenant
          },
          include: {
            role: true,
            tenant: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    if (!id) {
      throw new BadRequestException('User ID required');
    }

    return this.prisma.client.user.delete({
      where: { id },
    });
  }
}
