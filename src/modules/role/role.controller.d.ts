import { RoleService } from './role.service';
export declare class RoleController {
    private service;
    constructor(service: RoleService);
    create(body: any, req: any): Promise<{
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
    findAll(req: any): Promise<({
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
    findOne(id: string, req: any): Promise<({
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
    update(id: string, body: any, req: any): Promise<import("../../generated/prisma/internal/prismaNamespace").BatchPayload>;
    remove(id: string, req: any): Promise<import("../../generated/prisma/internal/prismaNamespace").BatchPayload>;
    assignPermissions(id: string, body: {
        permissionIds: string[];
    }): Promise<import("../../generated/prisma/internal/prismaNamespace").BatchPayload>;
}
