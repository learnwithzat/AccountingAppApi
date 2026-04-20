import { PrismaService } from './../../prisma/prisma.service';
import { Prisma, RoleType, Tenant } from '../../generated/prisma/client';
export declare class TenantService {
    private prisma;
    constructor(prisma: PrismaService);
    createTenantWithOwner(userId: string, data: Prisma.TenantCreateInput): Promise<Tenant>;
    findAll(): Promise<Tenant[]>;
    findOne(id: string): Promise<Tenant>;
    update(id: string, data: Prisma.TenantUpdateInput): Promise<Tenant>;
    remove(id: string): Promise<Tenant>;
    getUserTenants(userId: string): Promise<({
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
            type: RoleType;
        };
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        userId: string;
        tenantId: string;
        roleId: string;
    })[]>;
    getUserContext(userId: string, tenantId: string): Promise<{
        tenant: {
            name: string;
            slug: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("../../generated/prisma/enums").TenantStatus;
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
            type: RoleType;
        };
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        userId: string;
        tenantId: string;
        roleId: string;
    }>;
}
