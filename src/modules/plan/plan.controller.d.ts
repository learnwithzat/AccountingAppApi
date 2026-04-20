import { PlanService } from './plan.service';
export declare class PlanController {
    private service;
    constructor(service: PlanService);
    create(body: any): import("../../generated/prisma/models").Prisma__PlanClient<{
        name: string;
        id: string;
        createdAt: Date;
        price: number;
        interval: string;
        features: import("@prisma/client/runtime/client").JsonValue;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    findAll(): import("../../generated/prisma/internal/prismaNamespace").PrismaPromise<{
        name: string;
        id: string;
        createdAt: Date;
        price: number;
        interval: string;
        features: import("@prisma/client/runtime/client").JsonValue;
    }[]>;
}
