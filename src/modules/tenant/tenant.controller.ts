import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Req,
} from '@nestjs/common';

import { TenantService } from './tenant.service';
import { CreateTenantDto } from './create-tenant.dto';
import { UpdateTenantDto } from './update-tenant.dto';

// 👉 assume you have auth middleware that sets req.user
// (JWT guard later)

@Controller('tenants')
export class TenantController {
  constructor(private service: TenantService) {}

  //////////////////////////////////////////////////////
  // CREATE TENANT (AUTH REQUIRED)
  //////////////////////////////////////////////////////
  @Post()
  async create(@Req() req: any, @Body() body: CreateTenantDto) {
    const userId = req.user?.id;

    return this.service.createTenantWithOwner(userId, body);
  }

  //////////////////////////////////////////////////////
  // GET TENANTS FOR CURRENT USER (IMPORTANT)
  //////////////////////////////////////////////////////
  @Get('me')
  async getMyTenants(@Req() req: any) {
    const userId = req.user?.id;

    return this.service.getUserTenants(userId);
  }

  //////////////////////////////////////////////////////
  // GET USER CONTEXT (RBAC CORE)
  //////////////////////////////////////////////////////
  @Get(':tenantId/context')
  async getContext(@Req() req: any, @Param('tenantId') tenantId: string) {
    const userId = req.user?.id;

    return this.service.getUserContext(userId, tenantId);
  }

  //////////////////////////////////////////////////////
  // GET SINGLE TENANT
  //////////////////////////////////////////////////////
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  //////////////////////////////////////////////////////
  // UPDATE TENANT
  //////////////////////////////////////////////////////
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateTenantDto) {
    return this.service.update(id, body);
  }

  //////////////////////////////////////////////////////
  // DELETE TENANT (SUPER ADMIN ONLY LATER)
  //////////////////////////////////////////////////////
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  //////////////////////////////////////////////////////
  // ADMIN: GET ALL TENANTS (OPTIONAL)
  //////////////////////////////////////////////////////
  @Get()
  async findAll() {
    return this.service.findAll();
  }
}
