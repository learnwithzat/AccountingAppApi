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
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./../../prisma/prisma.service");
let RoleService = class RoleService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const exists = await this.prisma.role.findFirst({
            where: {
                name: data.name,
                tenantId: data.tenantId,
            },
        });
        if (exists) {
            throw new common_1.ConflictException('Role already exists in this tenant');
        }
        return this.prisma.role.create({
            data: {
                name: data.name,
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
    async findAll(tenantId) {
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
    async findOne(roleId, tenantId) {
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
    async update(roleId, tenantId, data) {
        return this.prisma.role.updateMany({
            where: {
                id: roleId,
                tenantId,
            },
            data,
        });
    }
    async remove(roleId, tenantId) {
        return this.prisma.role.deleteMany({
            where: {
                id: roleId,
                tenantId,
            },
        });
    }
    async assignPermissions(roleId, permissionIds) {
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
};
exports.RoleService = RoleService;
exports.RoleService = RoleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RoleService);
//# sourceMappingURL=role.service.js.map