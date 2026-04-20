import { PermissionService } from './permission.service';
export declare class PermissionController {
    private service;
    constructor(service: PermissionService);
    findAll(): import("../../generated/prisma/internal/prismaNamespace").PrismaPromise<{
        id: string;
        key: string;
        label: string;
    }[]>;
    create(body: {
        key: string;
        label: string;
    }): import("../../generated/prisma/models").Prisma__PermissionClient<{
        id: string;
        key: string;
        label: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    createMany(body: {
        permissions: any[];
    }): import("../../generated/prisma/internal/prismaNamespace").PrismaPromise<import("../../generated/prisma/internal/prismaNamespace").BatchPayload>;
}
