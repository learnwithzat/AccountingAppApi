import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
export declare class UserController {
    private readonly service;
    constructor(service: UserService);
    create(body: CreateUserDto): Promise<{
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
    }>;
    findAll(req: any): import("../../generated/prisma/internal/prismaNamespace").PrismaPromise<({
        memberships: ({
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
        })[];
    } & {
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
    })[]>;
    remove(id: string): Promise<{
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
    }>;
}
