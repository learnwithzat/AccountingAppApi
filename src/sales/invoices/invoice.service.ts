import { Injectable } from '@nestjs/common';
import { TaxService } from 'src/tax/tax.service';

@Injectable()
export class InvoiceService {
  private counters: Record<string, number> = {};

  constructor(private readonly taxService: TaxService) {}

  getNextInvoiceNumber(companyId: string) {
    const year = new Date().getFullYear();

    if (!this.counters[companyId]) {
      this.counters[companyId] = 1;
    } else {
      this.counters[companyId]++;
    }

    return {
      invoiceNo: `INV-${year}-${String(this.counters[companyId]).padStart(4, '0')}`,
    };
  }

  generatePreview(body: {
    companyId: string;
    customer: string;
    amount: number;
    country: string;
  }) {
    const invoice = this.getNextInvoiceNumber(body.companyId);

    const tax = this.taxService.calculateTax(body.amount, body.country);

    return {
      invoiceNo: invoice.invoiceNo,
      customer: body.customer,
      country: body.country,

      ...tax,

      date: new Date().toISOString().slice(0, 10),
    };
  }
  calculateTax(body: {
    companyId: string;
    customer: string;
    amount: number;
    country: string;
  }) {
    return this.taxService.calculateTax(body.amount, body.country);
  }
}
