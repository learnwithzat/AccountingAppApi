import { PrismaService } from './../../prisma/prisma.service';
export declare class RoleService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        name: string;
        type: any;
        tenantId: string;
        permissions?: string[];
    }): Promise<{
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
    }>;
    findAll(tenantId: string): Promise<({
        _count: {
            memberships: number;
        };
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
    })[]>;
    findOne(roleId: string, tenantId: string): Promise<({
        memberships: ({
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
        } & {
            id: string;
            isActive: boolean;
            createdAt: Date;
            userId: string;
            tenantId: string;
            roleId: string;
        })[];
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
    }) | null>;
    update(roleId: string, tenantId: string, data: any): Promise<import("../../generated/prisma/internal/prismaNamespace").BatchPayload>;
    remove(roleId: string, tenantId: string): Promise<import("../../generated/prisma/internal/prismaNamespace").BatchPayload>;
    assignPermissions(roleId: string, permissionIds: string[]): Promise<import("../../generated/prisma/internal/prismaNamespace").BatchPayload>;
}
