import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { CompanyModule } from '../company/company.module';

@Module({
  imports: [CompanyModule],
  controllers: [BillingController],
})
export class BillingModule {}
