import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // From header
    const tenantId = req.headers['x-tenant-id'];

    // From subdomain (optional)
    const host = req.headers.host || '';
    const subdomain = host.split('.')[0];

    req.tenantId = tenantId || subdomain;

    next();
  }
}