"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const hash_util_1 = require("../../common/utils/hash.util");
const prisma_service_1 = require("../../prisma/prisma.service");
let AuthService = class AuthService {
    prisma;
    jwt;
    constructor(prisma, jwt) {
        this.prisma = prisma;
        this.jwt = jwt;
    }
    async register(data) {
        const exists = await this.prisma.user.findFirst({
            where: {
                OR: [{ email: data.email }, { username: data.username }],
            },
        });
        if (exists)
            throw new common_1.ConflictException('User already exists');
        return this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                username: data.username,
                password: await (0, hash_util_1.hashPassword)(data.password),
            },
        });
    }
    async login(username, password) {
        const user = await this.prisma.user.findUnique({
            where: { username },
            include: {
                memberships: {
                    where: { isActive: true },
                    include: { tenant: true, role: true },
                },
            },
        });
        if (!user)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const valid = await (0, hash_util_1.comparePassword)(password, user.password);
        if (!valid)
            throw new common_1.UnauthorizedException('Invalid credentials');
        if (!user.memberships.length) {
            throw new common_1.UnauthorizedException('No tenant assigned');
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
    async me(userId) {
        const user = await this.prisma.user.findUnique({
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
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        return user;
    }
    async checkSetup() {
        const tenantCount = await this.prisma.tenant.count();
        return {
            isSetup: tenantCount > 0,
        };
    }
    async setup(data) {
        return this.prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    name: data.name,
                    email: data.email,
                    username: data.username,
                    password: await (0, hash_util_1.hashPassword)(data.password),
                },
            });
            const tenant = await tx.tenant.create({
                data: {
                    name: data.tenantName,
                    slug: data.slug,
                    status: 'ACTIVE',
                },
            });
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
            await tx.membership.create({
                data: {
                    userId: user.id,
                    tenantId: tenant.id,
                    roleId: ownerRole.id,
                    isActive: true,
                },
            });
            const token = this.jwt.sign({
                sub: user.id,
                tenantId: tenant.id,
                role: ownerRole.type,
            });
            return {
                access_token: token,
                user,
                tenant,
                role: ownerRole.type,
            };
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map