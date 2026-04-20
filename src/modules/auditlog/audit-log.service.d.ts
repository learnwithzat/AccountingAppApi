import { PrismaService } from './../../prisma/prisma.service';
export declare class AuditLogService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): import("../../generated/prisma/models").Prisma__AuditLogClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    findAll(): import("../../generated/prisma/internal/prismaNamespace").PrismaPromise<{
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
    }[]>;
}
