import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { InvoiceService } from './invoice.service';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  // GET /invoice/next-number?companyId=1
  @Get('next-number')
  getNextInvoiceNumber(@Query('companyId') companyId: string) {
    return this.invoiceService.getNextInvoiceNumber(companyId);
  }

  // POST /invoice/calculate-tax
  @Post('calculate-tax')
  calculateTax(
    @Body()
    body: {
      companyId: string;
      customer: string;
      amount: number;
      country: string;
    },
  ) {
    return this.invoiceService.calculateTax(body);
  }
  // (optional) create invoice summary
  @Post('preview')
  previewInvoice(
    @Body()
    body: {
      companyId: string;
      customer: string;
      amount: number;
      country: string; // 🇮🇳 IN | 🇸🇦 SA
    },
  ) {
    return this.invoiceService.generatePreview(body);
  }
}
