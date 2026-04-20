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
exports.TenantService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./../../prisma/prisma.service");
const client_1 = require("../../generated/prisma/client");
let TenantService = class TenantService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createTenantWithOwner(userId, data) {
        try {
            return await this.prisma.$transaction(async (tx) => {
                const tenant = await tx.tenant.create({
                    data: {
                        ...data,
                        status: 'ACTIVE',
                    },
                });
                const roles = await Promise.all([
                    tx.role.create({
                        data: {
                            name: 'Owner',
                            type: client_1.RoleType.OWNER,
                            tenantId: tenant.id,
                        },
                    }),
                    tx.role.create({
                        data: {
                            name: 'Admin',
                            type: client_1.RoleType.ADMIN,
                            tenantId: tenant.id,
                        },
                    }),
                    tx.role.create({
                        data: {
                            name: 'Manager',
                            type: client_1.RoleType.MANAGER,
                            tenantId: tenant.id,
                        },
                    }),
                    tx.role.create({
                        data: {
                            name: 'Staff',
                            type: client_1.RoleType.STAFF,
                            tenantId: tenant.id,
                        },
                    }),
                ]);
                const ownerRole = roles.find((r) => r.type === client_1.RoleType.OWNER);
                if (!ownerRole) {
                    throw new Error('Owner role creation failed');
                }
                await tx.membership.create({
                    data: {
                        userId,
                        tenantId: tenant.id,
                        roleId: ownerRole.id,
                    },
                });
                await tx.company.create({
                    data: {
                        name: `${data.name} Company`,
                        tenantId: tenant.id,
                    },
                });
                return tenant;
            });
        }
        catch (err) {
            if (err.code === 'P2002') {
                throw new common_1.ConflictException('Tenant slug already exists');
            }
            throw err;
        }
    }
    async findAll() {
        return this.prisma.tenant.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const tenant = await this.prisma.tenant.findUnique({
            where: { id },
            include: {
                roles: true,
                companies: true,
                branches: true,
                subscriptions: true,
            },
        });
        if (!tenant) {
            throw new common_1.NotFoundException('Tenant not found');
        }
        return tenant;
    }
    async update(id, data) {
        await this.findOne(id);
        try {
            return await this.prisma.tenant.update({
                where: { id },
                data,
            });
        }
        catch (err) {
            if (err.code === 'P2002') {
                throw new common_1.ConflictException('Tenant slug already exists');
            }
            throw err;
        }
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.tenant.delete({
            where: { id },
        });
    }
    async getUserTenants(userId) {
        return this.prisma.membership.findMany({
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
    async getUserContext(userId, tenantId) {
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
                tenant: true,
            },
        });
        if (!membership) {
            throw new common_1.NotFoundException('User is not part of this tenant or inactive');
        }
        return membership;
    }
};
exports.TenantService = TenantService;
exports.TenantService = TenantService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TenantService);
//# sourceMappingURL=tenant.service.js.map