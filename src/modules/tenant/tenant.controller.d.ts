import { TenantService } from './tenant.service';
import { CreateTenantDto } from './create-tenant.dto';
import { UpdateTenantDto } from './update-tenant.dto';
export declare class TenantController {
    private service;
    constructor(service: TenantService);
    create(req: any, body: CreateTenantDto): Promise<{
        name: string;
        slug: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../generated/prisma/enums").TenantStatus;
    }>;
    getMyTenants(req: any): Promise<({
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
    getContext(req: any, tenantId: string): Promise<{
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
    findOne(id: string): Promise<{
        name: string;
        slug: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../generated/prisma/enums").TenantStatus;
    }>;
    update(id: string, body: UpdateTenantDto): Promise<{
        name: string;
        slug: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../generated/prisma/enums").TenantStatus;
    }>;
    remove(id: string): Promise<{
        name: string;
        slug: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../generated/prisma/enums").TenantStatus;
    }>;
    findAll(): Promise<{
        name: string;
        slug: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../generated/prisma/enums").TenantStatus;
    }[]>;
}
