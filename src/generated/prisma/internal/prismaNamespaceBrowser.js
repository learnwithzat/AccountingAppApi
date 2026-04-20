"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonNullValueFilter = exports.NullsOrder = exports.QueryMode = exports.NullableJsonNullValueInput = exports.JsonNullValueInput = exports.SortOrder = exports.AuditLogScalarFieldEnum = exports.SubscriptionScalarFieldEnum = exports.PlanScalarFieldEnum = exports.BranchScalarFieldEnum = exports.CompanyScalarFieldEnum = exports.RolePermissionScalarFieldEnum = exports.PermissionScalarFieldEnum = exports.RoleScalarFieldEnum = exports.MembershipScalarFieldEnum = exports.UserScalarFieldEnum = exports.TenantScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.Decimal = void 0;
const runtime = __importStar(require("@prisma/client/runtime/index-browser"));
exports.Decimal = runtime.Decimal;
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    Tenant: 'Tenant',
    User: 'User',
    Membership: 'Membership',
    Role: 'Role',
    Permission: 'Permission',
    RolePermission: 'RolePermission',
    Company: 'Company',
    Branch: 'Branch',
    Plan: 'Plan',
    Subscription: 'Subscription',
    AuditLog: 'AuditLog'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.TenantScalarFieldEnum = {
    id: 'id',
    name: 'name',
    slug: 'slug',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.UserScalarFieldEnum = {
    id: 'id',
    email: 'email',
    username: 'username',
    password: 'password',
    name: 'name',
    isActive: 'isActive',
    emailVerified: 'emailVerified',
    lastLoginAt: 'lastLoginAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.MembershipScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    tenantId: 'tenantId',
    roleId: 'roleId',
    isActive: 'isActive',
    createdAt: 'createdAt'
};
exports.RoleScalarFieldEnum = {
    id: 'id',
    name: 'name',
    type: 'type',
    tenantId: 'tenantId',
    createdAt: 'createdAt'
};
exports.PermissionScalarFieldEnum = {
    id: 'id',
    key: 'key',
    label: 'label'
};
exports.RolePermissionScalarFieldEnum = {
    id: 'id',
    roleId: 'roleId',
    permissionId: 'permissionId'
};
exports.CompanyScalarFieldEnum = {
    id: 'id',
    name: 'name',
    tenantId: 'tenantId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.BranchScalarFieldEnum = {
    id: 'id',
    name: 'name',
    companyId: 'companyId',
    tenantId: 'tenantId',
    createdAt: 'createdAt'
};
exports.PlanScalarFieldEnum = {
    id: 'id',
    name: 'name',
    price: 'price',
    interval: 'interval',
    features: 'features',
    createdAt: 'createdAt'
};
exports.SubscriptionScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    planId: 'planId',
    status: 'status',
    stripeCustomerId: 'stripeCustomerId',
    stripeSubId: 'stripeSubId',
    currentPeriodStart: 'currentPeriodStart',
    currentPeriodEnd: 'currentPeriodEnd',
    cancelAtPeriodEnd: 'cancelAtPeriodEnd',
    createdAt: 'createdAt'
};
exports.AuditLogScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    tenantId: 'tenantId',
    action: 'action',
    entity: 'entity',
    entityId: 'entityId',
    ip: 'ip',
    userAgent: 'userAgent',
    metadata: 'metadata',
    createdAt: 'createdAt'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.JsonNullValueInput = {
    JsonNull: exports.JsonNull
};
exports.NullableJsonNullValueInput = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.JsonNullValueFilter = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull,
    AnyNull: exports.AnyNull
};
//# sourceMappingURL=prismaNamespaceBrowser.js.map