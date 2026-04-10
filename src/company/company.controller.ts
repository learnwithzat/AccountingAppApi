import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Put,
} from '@nestjs/common';

import { CompanyService } from './company.service';
import { RegisterCompanyDto } from './dto/register-company.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdatePlanDto } from './dto/plan.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  /* ───── REGISTER COMPANY ───── */
  @Post('register')
  async register(@Body() dto: RegisterCompanyDto) {
    return this.companyService.registerCompany(dto);
  }

  /* ───── COMPANY STATUS ───── */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getCompanyStatus(@Param('id') id: string) {
    const company = await this.companyService.findById(id);

    return {
      id: company.id,
      companyName: company.companyName,

      plan: company.plan,
      isSubscribed: company.isSubscribed,
      isActiveSubscription: company.isActiveSubscription,

      trialStart: company.trialStart,
      trialEnd: company.trialEnd,

      /* ERP SETTINGS */
      country: company.country,
      taxSystem: company.taxSystem,
      defaultTaxRate: company.defaultTaxRate,
      currency: company.currency,
      invoicePrefix: company.invoicePrefix,
    };
  }

  /* ───── ALL COMPANIES ───── */
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllCompanies() {
    const companies = await this.companyService.findAll();
    const today = new Date();

    return companies.map((c) => {
      const trialEnd = c.trialEnd ? new Date(c.trialEnd) : null;
      const diffDays = trialEnd
        ? Math.ceil(
            (trialEnd.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
          )
        : 0;

      return {
        id: c.id,
        name: c.companyName,

        plan: c.plan,
        isSubscribed: c.isSubscribed,
        isActiveSubscription: c.isActiveSubscription,

        trialStart: c.trialStart,
        trialEnd: c.trialEnd,

        daysLeft: diffDays > 0 ? diffDays : 0,
        isExpired: diffDays < 0,

        country: c.country,
        taxSystem: c.taxSystem,
        currency: c.currency,
      };
    });
  }

  /* ───── UPDATE PLAN ───── */
  @UseGuards(JwtAuthGuard)
  @Put(':id/plan')
  async updatePlan(@Param('id') id: string, @Body() dto: UpdatePlanDto) {
    await this.companyService.updatePlan(id, dto.plan);

    return {
      statusCode: 200,
      message: 'Plan updated successfully',
    };
  }

  /* ───── UPDATE ERP SETTINGS ───── */
  @UseGuards(JwtAuthGuard)
  @Put(':id/settings')
  async updateSettings(
    @Param('id') id: string,
    @Body()
    body: {
      country: string;
      taxSystem: string;
      defaultTaxRate: number;
      currency: string;
      invoicePrefix?: string;
    },
  ) {
    await this.companyService.updateSettings(id, body);

    return {
      statusCode: 200,
      message: 'Company ERP settings updated successfully',
    };
  }
}
