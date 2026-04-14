/** @format */

import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import type { Customer, CustomerStatus } from './customer.types';

@Controller('companies/:companyId/customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  findAll(@Param('companyId', ParseUUIDPipe) companyId: string) {
    return this.customerService.findAll(companyId);
  }

  @Get(':id')
  findOne(
    @Param('companyId', ParseUUIDPipe) companyId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.customerService.findOne(companyId, id);
  }

  @Post()
  create(
    @Param('companyId', ParseUUIDPipe) companyId: string,
    @Body() data: Partial<Customer>,
  ) {
    return this.customerService.create(companyId, data);
  }

  @Put(':id')
  update(
    @Param('companyId', ParseUUIDPipe) companyId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: Partial<Customer>,
  ) {
    return this.customerService.update(companyId, id, data);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('companyId', ParseUUIDPipe) companyId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body('status') status: CustomerStatus,
  ) {
    return this.customerService.updateStatus(companyId, id, status);
  }

  @Post('bulk-delete')
  bulkDelete(
    @Param('companyId', ParseUUIDPipe) companyId: string,
    @Body('ids') ids: string[],
  ) {
    return this.customerService.bulkDelete(companyId, ids);
  }

  @Delete(':id')
  remove(
    @Param('companyId', ParseUUIDPipe) companyId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.customerService.remove(companyId, id);
  }
}
