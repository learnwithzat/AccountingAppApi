import { Injectable } from '@nestjs/common';

type TaxType = 'GST' | 'VAT' | 'NONE';

@Injectable()
export class TaxService {
  /* ─────────────────────────────
     MAIN TAX ENGINE
  ───────────────────────────── */
  calculateTax(amount: number, country: string) {
    switch (country) {
      /* 🇮🇳 INDIA GST */
      case 'IN':
        return this.calculateGST(amount);

      /* 🇸🇦 KSA VAT */
      case 'SA':
        return this.calculateVAT(amount, 15);

      /* NO TAX */
      default:
        return this.noTax(amount);
    }
  }

  /* ───────── INDIA GST ───────── */
  private calculateGST(amount: number) {
    const rate = 18; // default GST

    const tax = (amount * rate) / 100;

    return {
      type: 'GST',
      rate,
      subtotal: amount,
      tax,
      total: amount + tax,
      breakdown: {
        cgst: tax / 2,
        sgst: tax / 2,
        igst: 0,
      },
    };
  }

  /* ───────── VAT (KSA, UAE etc) ───────── */
  private calculateVAT(amount: number, rate: number) {
    const tax = (amount * rate) / 100;

    return {
      type: 'VAT',
      rate,
      subtotal: amount,
      tax,
      total: amount + tax,
    };
  }

  /* ───────── NO TAX ───────── */
  private noTax(amount: number) {
    return {
      type: 'NONE',
      rate: 0,
      subtotal: amount,
      tax: 0,
      total: amount,
    };
  }
}
