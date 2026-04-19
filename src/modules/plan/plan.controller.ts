import { Controller, Post, Body, Get } from '@nestjs/common';
import { PlanService } from './plan.service';

@Controller('plan')
export class PlanController {
  constructor(private service: PlanService) {}

  @Post() create(@Body() body: any) {
    return this.service.create(body);
  }
  @Get() findAll() {
    return this.service.findAll();
  }
}
