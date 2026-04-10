import { Module } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { TaxService } from 'src/tax/tax.service';
@Module({
  controllers: [InvoiceController],
  providers: [InvoiceService, TaxService],
  exports: [InvoiceService],
})
export class InvoiceModule {}
