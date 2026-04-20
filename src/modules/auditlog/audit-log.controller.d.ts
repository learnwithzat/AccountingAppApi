import { AuditLogService } from './audit-log.service';
export declare class AuditLogController {
    private service;
    constructor(service: AuditLogService);
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
