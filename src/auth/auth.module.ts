import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { TenantsModule } from '../tenants/tenants.module';

@Module({
  imports: [UsersModule, TenantsModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
