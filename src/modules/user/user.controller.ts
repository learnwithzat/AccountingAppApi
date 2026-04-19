import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Query,
  Req,
} from '@nestjs/common';

import { UserService } from './user.service';
import { Public } from '../../common/decorators/public.decorator';
import { CreateUserDto } from './create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  /**
   * CREATE USER
   */
  @Public()
  @Post()
  create(@Body() body: CreateUserDto) {
    return this.service.create(body);
  }

  /**
   * GET ALL USERS (ADMIN ONLY in real SaaS)
   */
  @Get()
  findAll(@Req() req: any) {
    const tenantId = req.headers['x-tenant-id']; // or from JWT

    return this.service.findAll(tenantId);
  }

  /**
   * DELETE USER
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
