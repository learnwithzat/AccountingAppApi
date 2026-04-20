import { PrismaService } from './../../prisma/prisma.service';
export declare class CompanyService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): import("../../generated/prisma/models").Prisma__CompanyClient<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    findAll(): import("../../generated/prisma/internal/prismaNamespace").PrismaPromise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
    }[]>;
}
