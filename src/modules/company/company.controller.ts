import { Controller, Post, Body, Get } from '@nestjs/common';
import { CompanyService } from './company.service';

// company.controller.ts
@Controller('company')
export class CompanyController {
  constructor(private service: CompanyService) {}

  @Post() create(@Body() body: any) {
    return this.service.create(body);
  }
  @Get() findAll() {
    return this.service.findAll();
  }
}
