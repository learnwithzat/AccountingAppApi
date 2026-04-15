import { Module, Global } from '@nestjs/common';
import { TenantContextService } from 'src/tenants/tenant-context.service';

@Global()
@Module({
  providers: [TenantContextService],
  exports: [TenantContextService],
})
export class CommonModule {}
