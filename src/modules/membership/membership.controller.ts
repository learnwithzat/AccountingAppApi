/** @format */

import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { MembershipService } from './membership.service';

@Controller('membership')
export class MembershipController {
  constructor(private service: MembershipService) {}

  //////////////////////////////////////////////////////
  // CREATE MEMBERSHIP (ADMIN ONLY)
  //////////////////////////////////////////////////////
  @Post()
  create(
    @Body()
    body: {
      userId: string;
      tenantId: string;
      roleId: string;
    },
  ) {
    return this.service.create(body);
  }

  //////////////////////////////////////////////////////
  // GET ALL MEMBERSHIPS (SUPER ADMIN)
  //////////////////////////////////////////////////////
  @Get()
  findAll() {
    return this.service.findAll();
  }

  //////////////////////////////////////////////////////
  // GET MEMBERSHIPS BY TENANT (ORG VIEW)
  //////////////////////////////////////////////////////
  @Get('tenant/:tenantId')
  findByTenant(@Param('tenantId') tenantId: string) {
    return this.service.findByTenant(tenantId);
  }

  //////////////////////////////////////////////////////
  // GET USER WORKSPACES (VERY IMPORTANT FOR SAAS)
  //////////////////////////////////////////////////////
  @Get('user/:userId')
  findUserTenants(@Param('userId') userId: string) {
    return this.service.findUserTenants(userId);
  }

  //////////////////////////////////////////////////////
  // DEACTIVATE MEMBERSHIP (REMOVE USER FROM TENANT)
  //////////////////////////////////////////////////////
  @Post('deactivate/:id')
  deactivate(@Param('id') id: string) {
    return this.service.deactivate(id);
  }
}
