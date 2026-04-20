import { PrismaService } from './../../prisma/prisma.service';
export declare class SubscriptionService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): import("../../generated/prisma/models").Prisma__SubscriptionClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    findAll(): import("../../generated/prisma/internal/prismaNamespace").PrismaPromise<{
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
    }[]>;
    remove(id: string): import("../../generated/prisma/models").Prisma__SubscriptionClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
}
