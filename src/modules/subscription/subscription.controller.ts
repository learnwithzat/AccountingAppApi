import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
export class SubscriptionController {
  constructor(private service: SubscriptionService) {}

  @Post() create(@Body() body: any) {
    return this.service.create(body);
  }
  @Get() findAll() {
    return this.service.findAll();
  }

  @Delete(':id') remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
