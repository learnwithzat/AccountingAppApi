import { PrismaService } from './../../prisma/prisma.service';
export declare class MembershipService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        userId: string;
        tenantId: string;
        roleId: string;
    }): Promise<{
        tenant: {
            name: string;
            slug: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("../../generated/prisma/enums").TenantStatus;
        };
        user: {
            name: string;
            email: string;
            username: string;
            password: string;
            id: string;
            isActive: boolean;
            emailVerified: boolean;
            lastLoginAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
        role: {
            permissions: ({
                permission: {
                    id: string;
                    key: string;
                    label: string;
                };
            } & {
                id: string;
                roleId: string;
                permissionId: string;
            })[];
        } & {
            name: string;
            id: string;
            createdAt: Date;
            tenantId: string;
            type: import("../../generated/prisma/enums").RoleType;
        };
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        userId: string;
        tenantId: string;
        roleId: string;
    }>;
    findAll(): import("../../generated/prisma/internal/prismaNamespace").PrismaPromise<({
        tenant: {
            name: string;
            slug: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("../../generated/prisma/enums").TenantStatus;
        };
        user: {
            name: string;
            email: string;
            username: string;
            password: string;
            id: string;
            isActive: boolean;
            emailVerified: boolean;
            lastLoginAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
        role: {
            name: string;
            id: string;
            createdAt: Date;
            tenantId: string;
            type: import("../../generated/prisma/enums").RoleType;
        };
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        userId: string;
        tenantId: string;
        roleId: string;
    })[]>;
    findByTenant(tenantId: string): import("../../generated/prisma/internal/prismaNamespace").PrismaPromise<({
        user: {
            name: string;
            email: string;
            username: string;
            password: string;
            id: string;
            isActive: boolean;
            emailVerified: boolean;
            lastLoginAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
        role: {
            name: string;
            id: string;
            createdAt: Date;
            tenantId: string;
            type: import("../../generated/prisma/enums").RoleType;
        };
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        userId: string;
        tenantId: string;
        roleId: string;
    })[]>;
    findUserTenants(userId: string): import("../../generated/prisma/internal/prismaNamespace").PrismaPromise<({
        tenant: {
            name: string;
            slug: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("../../generated/prisma/enums").TenantStatus;
        };
        role: {
            name: string;
            id: string;
            createdAt: Date;
            tenantId: string;
            type: import("../../generated/prisma/enums").RoleType;
        };
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        userId: string;
        tenantId: string;
        roleId: string;
    })[]>;
    deactivate(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        userId: string;
        tenantId: string;
        roleId: string;
    }>;
}
