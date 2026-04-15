import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class TenantContextService {
  constructor(@Inject(REQUEST) private readonly request: any) {}

  get tenantId(): string | null {
    const tenantId = this.request.tenantId;
    if (!tenantId) {
      // You can choose to throw an error here if a tenant is strictly required
      return null;
    }
    return tenantId;
  }
}
