import { TenantStatus } from '../../generated/prisma/client';
export declare class CreateTenantDto {
    name: string;
    slug: string;
    status?: TenantStatus;
}
