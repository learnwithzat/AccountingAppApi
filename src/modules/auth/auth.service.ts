import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './../../prisma/prisma.service';
import { comparePassword, hashPassword } from '../../common/utils/hash.util';
import { SetupDto } from './auth.setup.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  //////////////////////////////////////////////////////
  // REGISTER (optional standalone)
  //////////////////////////////////////////////////////
  async register(data: any) {
    const exists = await this.prisma.client.user.findFirst({
      where: {
        OR: [{ email: data.email }, { username: data.username }],
      },
    });

    if (exists) throw new ConflictException('User already exists');

    return this.prisma.client.user.create({
      data: {
        name: data.name,
        email: data.email,
        username: data.username,
        password: await hashPassword(data.password),
      },
    });
  }

  //////////////////////////////////////////////////////
  // LOGIN
  //////////////////////////////////////////////////////
  async login(username: string, password: string) {
    const user = await this.prisma.client.user.findUnique({
      where: { username },
      include: {
        memberships: {
          where: { isActive: true },
          include: { tenant: true, role: true },
        },
      },
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await comparePassword(password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    if (!user.memberships.length) {
      throw new UnauthorizedException('No tenant assigned');
    }

    const membership = user.memberships[0];

    const token = this.jwt.sign({
      sub: user.id,
      tenantId: membership.tenantId,
      role: membership.role.type,
    });

    return {
      access_token: token,
      user,
      tenant: membership.tenant,
      role: membership.role.type,
    };
  }

  //////////////////////////////////////////////////////
  // ME
  //////////////////////////////////////////////////////
  async me(userId: string) {
    const user = await this.prisma.client.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,

        memberships: {
          where: { isActive: true },
          include: {
            tenant: {
              include: {
                companies: true,
                branches: true,
                roles: true,
                subscriptions: {
                  include: { plan: true },
                  orderBy: { createdAt: 'desc' },
                  take: 1,
                },
                auditLogs: {
                  orderBy: { createdAt: 'desc' },
                  take: 10,
                },
              },
            },
            role: {
              include: {
                permissions: {
                  include: { permission: true },
                },
              },
            },
          },
        },
      },
    });

    if (!user) throw new UnauthorizedException('User not found');
    return user;
  }

  //////////////////////////////////////////////////////
  // CHECK SETUP
  //////////////////////////////////////////////////////
  async checkSetup() {
    const tenantCount = await this.prisma.client.tenant.count();

    return {
      isSetup: tenantCount > 0,
    };
  }

  //////////////////////////////////////////////////////
  // FULL SAAS SETUP (FIXED)
  //////////////////////////////////////////////////////
  async setup(data: SetupDto) {
    return this.prisma.client.$transaction(async (tx) => {
      //////////////////////////////////////////////////
      // 1. USER
      //////////////////////////////////////////////////
      const user = await tx.user.create({
        data: {
          name: data.name,
          email: data.email,
          username: data.username,
          password: await hashPassword(data.password),
        },
      });

      //////////////////////////////////////////////////
      // 2. TENANT
      //////////////////////////////////////////////////
      const tenant = await tx.tenant.create({
        data: {
          name: data.tenantName,
          slug: data.slug,
          status: 'ACTIVE',
        },
      });

      //////////////////////////////////////////////////
      // 3. ROLES (FIXED - NO createMany BUG)
      //////////////////////////////////////////////////
      const ownerRole = await tx.role.create({
        data: { name: 'Owner', type: 'OWNER', tenantId: tenant.id },
      });

      await tx.role.createMany({
        data: [
          { name: 'Admin', type: 'ADMIN', tenantId: tenant.id },
          { name: 'Manager', type: 'MANAGER', tenantId: tenant.id },
          { name: 'Staff', type: 'STAFF', tenantId: tenant.id },
        ],
      });

      //////////////////////////////////////////////////
      // 4. MEMBERSHIP
      //////////////////////////////////////////////////
      await tx.membership.create({
        data: {
          userId: user.id,
          tenantId: tenant.id,
          roleId: ownerRole.id,
          isActive: true,
        },
      });

      //////////////////////////////////////////////////
      // 5. TOKEN
      //////////////////////////////////////////////////
      const token = this.jwt.sign({
        sub: user.id,
        tenantId: tenant.id,
        role: ownerRole.type,
      });

      //////////////////////////////////////////////////
      // 6. RETURN
      //////////////////////////////////////////////////
      return {
        access_token: token,
        user,
        tenant,
        role: ownerRole.type,
      };
    });
  }
}
