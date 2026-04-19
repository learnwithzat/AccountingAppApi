/** @format */

import { Controller, Get, Post, Body } from '@nestjs/common';
import { PermissionService } from './permission.service';

@Controller('permission')
export class PermissionController {
  constructor(private service: PermissionService) {}

  //////////////////////////////////////////////////////
  // GET ALL PERMISSIONS
  //////////////////////////////////////////////////////
  @Get()
  findAll() {
    return this.service.findAll();
  }

  //////////////////////////////////////////////////////
  // CREATE PERMISSION (OPTIONAL ADMIN FEATURE)
  //////////////////////////////////////////////////////
  @Post()
  create(@Body() body: { key: string; label: string }) {
    return this.service.create(body);
  }

  //////////////////////////////////////////////////////
  // BULK SEED (OPTIONAL FOR SETUP)
  //////////////////////////////////////////////////////
  @Post('bulk')
  createMany(@Body() body: { permissions: any[] }) {
    return this.service.createMany(body.permissions);
  }
}
