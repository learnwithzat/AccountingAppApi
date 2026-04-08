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

    // Example subscription status mapping
    return {
      plan: company.plan, // 'free' | 'basic' | 'pro'
      isSubscribed: company.isSubscribed,
      isActiveSubscription: company.isActiveSubscription,
      trialEnd: company.trialEnd,
    };
  }
}
