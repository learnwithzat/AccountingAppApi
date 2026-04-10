import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  // GET /dashboard/summary?companyId=
  @Get('summary')
  getSummary(@Query('companyId') companyId: string) {
    return this.dashboardService.getSummary(companyId);
  }

  // GET /dashboard/sales-chart?companyId=
  @Get('sales-chart')
  getSalesChart(@Query('companyId') companyId: string) {
    return this.dashboardService.getSalesChart(companyId);
  }

  // GET /dashboard/purchase-chart?companyId=
  @Get('purchase-chart')
  getPurchaseChart(@Query('companyId') companyId: string) {
    return this.dashboardService.getPurchaseChart(companyId);
  }

  // GET /dashboard/customer-growth?companyId=
  @Get('customer-growth')
  getCustomerGrowth(@Query('companyId') companyId: string) {
    return this.dashboardService.getCustomerGrowth(companyId);
  }

  // GET /dashboard/transactions?companyId=
  @Get('transactions')
  getTransactions(@Query('companyId') companyId: string) {
    return this.dashboardService.getTransactions(companyId);
  }
}
