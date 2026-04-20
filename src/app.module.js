"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./modules/auth/auth.module");
const tenant_module_1 = require("./modules/tenant/tenant.module");
const user_module_1 = require("./modules/user/user.module");
const company_module_1 = require("./modules/company/company.module");
const role_module_1 = require("./modules/role/role.module");
const membership_module_1 = require("./modules/membership/membership.module");
const plan_module_1 = require("./modules/plan/plan.module");
const subscription_module_1 = require("./modules/subscription/subscription.module");
const logger_middleware_1 = require("./common/middleware/logger.middleware");
const tenant_middleware_1 = require("./common/middleware/tenant.middleware");
const audit_log_module_1 = require("./modules/auditlog/audit-log.module");
const permission_module_1 = require("./modules/permission/permission.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware, tenant_middleware_1.TenantMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            tenant_module_1.TenantModule,
            user_module_1.UserModule,
            company_module_1.CompanyModule,
            role_module_1.RoleModule,
            permission_module_1.PermissionModule,
            membership_module_1.MembershipModule,
            plan_module_1.PlanModule,
            subscription_module_1.SubscriptionModule,
            audit_log_module_1.AuditLogModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map