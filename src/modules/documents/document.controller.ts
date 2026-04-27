import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { CreateDocumentDto, UpdateDocumentDto } from './document.dto';
import { CurrentUser } from '../../common/decorators/user.decorator';
import type { RequestedUser } from '../../common/decorators/user.decorator';
import { Tenant as TenantDecorator } from '../../common/decorators/tenant.decorator';

@Controller('documents')
export class DocumentController {
  constructor(private readonly service: DocumentService) {}

  // 🔐 assume tenant + user from auth middleware
  @Post()
  create(
    @Body() dto: CreateDocumentDto,
    @TenantDecorator() tenantId: string,
    @CurrentUser() user: RequestedUser,
  ) {
    return this.service.create(dto, tenantId, user.id);
  }

  @Get()
  findAll(@Query() query: any, @TenantDecorator() tenantId: string) {
    return this.service.findAll(tenantId, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @TenantDecorator() tenantId: string) {
    return this.service.findOne(id, tenantId);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateDocumentDto,
    @TenantDecorator() tenantId: string,
  ) {
    return this.service.update(id, dto, tenantId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @TenantDecorator() tenantId: string) {
    return this.service.remove(id, tenantId);
  }
}
