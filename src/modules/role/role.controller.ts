/** @format */

import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Req,
} from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private service: RoleService) {}

  //////////////////////////////////////////////////////
  // CREATE ROLE (TENANT SCOPED)
  //////////////////////////////////////////////////////
  @Post()
  create(@Body() body: any, @Req() req: any) {
    return this.service.create({
      ...body,
      tenantId: req.user.tenantId,
    });
  }

  //////////////////////////////////////////////////////
  // GET ALL ROLES (TENANT ONLY)
  //////////////////////////////////////////////////////
  @Get()
  findAll(@Req() req: any) {
    return this.service.findAll(req.user.tenantId);
  }

  //////////////////////////////////////////////////////
  // GET ONE ROLE
  //////////////////////////////////////////////////////
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.service.findOne(id, req.user.tenantId);
  }

  //////////////////////////////////////////////////////
  // UPDATE ROLE
  //////////////////////////////////////////////////////
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any, @Req() req: any) {
    return this.service.update(id, req.user.tenantId, body);
  }

  //////////////////////////////////////////////////////
  // DELETE ROLE
  //////////////////////////////////////////////////////
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.service.remove(id, req.user.tenantId);
  }

  //////////////////////////////////////////////////////
  // ASSIGN PERMISSIONS (IAM STYLE)
  //////////////////////////////////////////////////////
  @Post(':id/permissions')
  assignPermissions(
    @Param('id') id: string,
    @Body() body: { permissionIds: string[] },
  ) {
    return this.service.assignPermissions(id, body.permissionIds);
  }
}
