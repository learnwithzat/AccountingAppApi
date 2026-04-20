import { JwtService } from '@nestjs/jwt';
import { SetupDto } from './auth.setup.dto';
import { PrismaService } from '../../prisma/prisma.service';
export declare class AuthService {
    private prisma;
    private jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    register(data: any): Promise<{
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
    login(username: string, password: string): Promise<{
        access_token: string;
        user: {
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
        };
        tenant: {
            name: string;
            slug: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("../../generated/prisma/enums").TenantStatus;
        };
        role: import("../../generated/prisma/enums").RoleType;
    }>;
    me(userId: string): Promise<{
        name: string;
        email: string;
        username: string;
        id: string;
        memberships: ({
            tenant: {
                companies: {
                    name: string;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    tenantId: string;
                }[];
                branches: {
                    name: string;
                    id: string;
                    createdAt: Date;
                    tenantId: string;
                    companyId: string;
                }[];
                roles: {
                    name: string;
                    id: string;
                    createdAt: Date;
                    tenantId: string;
                    type: import("../../generated/prisma/enums").RoleType;
                }[];
                subscriptions: ({
                    plan: {
                        name: string;
                        id: string;
                        createdAt: Date;
                        price: number;
                        interval: string;
                        features: import("@prisma/client/runtime/client").JsonValue;
                    };
                } & {
                    id: string;
                    createdAt: Date;
                    tenantId: string;
                    status: import("../../generated/prisma/enums").SubscriptionStatus;
                    stripeCustomerId: string | null;
                    stripeSubId: string | null;
                    currentPeriodStart: Date;
                    currentPeriodEnd: Date | null;
                    cancelAtPeriodEnd: boolean;
                    planId: string;
                })[];
                auditLogs: {
                    id: string;
                    createdAt: Date;
                    userId: string | null;
                    tenantId: string;
                    action: string;
                    entity: string;
                    entityId: string | null;
                    ip: string | null;
                    userAgent: string | null;
                    metadata: import("@prisma/client/runtime/client").JsonValue | null;
                }[];
            } & {
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
        })[];
    }>;
    checkSetup(): Promise<{
        isSetup: boolean;
    }>;
    setup(data: SetupDto): Promise<{
        access_token: string;
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
        tenant: {
            name: string;
            slug: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("../../generated/prisma/enums").TenantStatus;
        };
        role: import("../../generated/prisma/enums").RoleType;
    }>;
}
