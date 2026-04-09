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
      plan: company.plan,
      isSubscribed: company.isSubscribed,
      isActiveSubscription: company.isActiveSubscription,
      trialEnd: company.trialEnd,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllCompanies() {
    const companies = await this.companyService.findAll();
    const today = new Date();

    return companies.map((c) => {
      const trialEnd = c.trialEnd ? new Date(c.trialEnd) : null;
      const diffTime = trialEnd ? trialEnd.getTime() - today.getTime() : 0;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      return {
        id: c.id,
        name: c.companyName,
        plan: c.plan,
        isSubscribed: c.isSubscribed,
        isActiveSubscription: c.isActiveSubscription,
        trialStart: c.trialStart,
        trialEnd: c.trialEnd,
        balanceDays: diffDays,
        isExpired: diffDays < 0,
        daysLeft: diffDays > 0 ? diffDays : 0,
      };
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/plan')
  async updatePlan(@Param('id') id: string, @Body() dto: UpdatePlanDto) {
    const company = await this.companyService.findById(id);

    if (!company) {
      return { statusCode: 404, message: 'Company not found' };
    }

    await this.companyService.updatePlan(id, dto.plan);
    return { statusCode: 200, message: 'Plan updated successfully' };
  }
}
