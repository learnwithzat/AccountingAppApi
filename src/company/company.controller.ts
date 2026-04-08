// src/company/company.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { CompanyService } from './company.service';
import { RegisterCompanyDto } from './dto/register-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('register')
  async register(@Body() dto: RegisterCompanyDto) {
    return this.companyService.registerCompany(dto);
  }
}
