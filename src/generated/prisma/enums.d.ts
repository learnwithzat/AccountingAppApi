export declare const TenantStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly SUSPENDED: "SUSPENDED";
    readonly DELETED: "DELETED";
};
export type TenantStatus = (typeof TenantStatus)[keyof typeof TenantStatus];
export declare const SubscriptionStatus: {
    readonly TRIAL: "TRIAL";
    readonly ACTIVE: "ACTIVE";
    readonly PAST_DUE: "PAST_DUE";
    readonly CANCELLED: "CANCELLED";
    readonly EXPIRED: "EXPIRED";
};
export type SubscriptionStatus = (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus];
export declare const RoleType: {
    readonly OWNER: "OWNER";
    readonly ADMIN: "ADMIN";
    readonly MANAGER: "MANAGER";
    readonly STAFF: "STAFF";
};
export type RoleType = (typeof RoleType)[keyof typeof RoleType];
