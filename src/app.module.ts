import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // ✅ ADD THIS

import { PrismaModule } from './prisma/prisma.module';

// Modules
import { AuthModule } from './modules/auth/auth.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { UserModule } from './modules/user/user.module';
import { CompanyModule } from './modules/company/company.module';
import { RoleModule } from './modules/role/role.module';
import { MembershipModule } from './modules/membership/membership.module';
import { PlanModule } from './modules/plan/plan.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';

// Middleware
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { TenantMiddleware } from './common/middleware/tenant.middleware';
import { AuditLogModule } from './modules/auditlog/audit-log.module';
import { PermissionModule } from './modules/permission/permission.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
    }),

    PrismaModule,

    AuthModule,
    TenantModule,
    UserModule,
    CompanyModule,
    RoleModule,
    PermissionModule,
    MembershipModule,
    PlanModule,
    SubscriptionModule,
    AuditLogModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, TenantMiddleware).forRoutes('*');
  }
}
