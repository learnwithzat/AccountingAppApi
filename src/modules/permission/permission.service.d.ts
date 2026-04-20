import { PrismaService } from './../../prisma/prisma.service';
export declare class PermissionService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import("../../generated/prisma/internal/prismaNamespace").PrismaPromise<{
        id: string;
        key: string;
        label: string;
    }[]>;
    create(data: {
        key: string;
        label: string;
    }): import("../../generated/prisma/models").Prisma__PermissionClient<{
        id: string;
        key: string;
        label: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    createMany(data: {
        key: string;
        label: string;
    }[]): import("../../generated/prisma/internal/prismaNamespace").PrismaPromise<import("../../generated/prisma/internal/prismaNamespace").BatchPayload>;
}
