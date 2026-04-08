// src/company/company.controller.ts
import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { RegisterCompanyDto } from './dto/register-company.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('register')
  async register(@Body() dto: RegisterCompanyDto) {
    return this.companyService.registerCompany(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getCompanyStatus(@Param('id') id: string) {
    const company = await this.companyService.findById(id);

    if (!company) {
      return { statusCode: 404, message: 'Company not found' };
    }

    return {
      plan: company.plan, // 'free' | 'basic' | 'pro'
      isSubscribed: company.isSubscribed,
      isActiveSubscription: company.isActiveSubscription,
      trialEnd: company.trialEnd,
    };
  }

  // New GET endpoint to fetch all companies
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllCompanies() {
    const companies = await this.companyService.findAll();
    return companies.map((c) => ({
      id: c.id,
      name: c.companyName,
      plan: c.plan,
      isSubscribed: c.isSubscribed,
      isActiveSubscription: c.isActiveSubscription,
      trialEnd: c.trialEnd,
    }));
  }
}
