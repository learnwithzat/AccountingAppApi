import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  /* ───────────── SUMMARY ───────────── */
  getSummary(companyId: string) {
    return {
      companyId,
      sales: 92450,
      purchases: 48200,
      customers: 1240,
      transactions: 342,
      profit: 44250,
    };
  }

  /* ───────────── SALES CHART ───────────── */
  getSalesChart(companyId: string) {
    return [
      { month: 'Jan', sales: 12000 },
      { month: 'Feb', sales: 15000 },
      { month: 'Mar', sales: 18000 },
      { month: 'Apr', sales: 22000 },
      { month: 'May', sales: 26000 },
      { month: 'Jun', sales: 30000 },
    ];
  }

  /* ───────────── PURCHASE CHART ───────────── */
  getPurchaseChart(companyId: string) {
    return [
      { month: 'Jan', purchases: 8000 },
      { month: 'Feb', purchases: 9000 },
      { month: 'Mar', purchases: 11000 },
      { month: 'Apr', purchases: 14000 },
      { month: 'May', purchases: 16000 },
      { month: 'Jun', purchases: 18000 },
    ];
  }

  /* ───────────── CUSTOMER GROWTH ───────────── */
  getCustomerGrowth(companyId: string) {
    return [
      { month: 'Jan', customers: 200 },
      { month: 'Feb', customers: 350 },
      { month: 'Mar', customers: 500 },
      { month: 'Apr', customers: 700 },
      { month: 'May', customers: 950 },
      { month: 'Jun', customers: 1240 },
    ];
  }

  /* ───────────── TRANSACTIONS ───────────── */
  getTransactions(companyId: string) {
    return [
      { type: 'sale', amount: 5000, date: '2026-04-01' },
      { type: 'purchase', amount: -2000, date: '2026-04-02' },
      { type: 'sale', amount: 3200, date: '2026-04-03' },
      { type: 'receipt', amount: 1500, date: '2026-04-04' },
      { type: 'payment', amount: -900, date: '2026-04-05' },
    ];
  }
}
