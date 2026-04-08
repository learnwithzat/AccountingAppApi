// src/common/guards/subscription.guard.ts

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class SubscriptionGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user;

    const company = user.company;

    if (!company) {
      throw new ForbiddenException('No company found');
    }

    const now = new Date();

    const trialExpired = company.trialEnd && new Date(company.trialEnd) < now;

    if (trialExpired && !company.isSubscribed) {
      throw new ForbiddenException(
        'Trial expired. Please renew your subscription.',
      );
    }

    if (!company.isActive) {
      throw new ForbiddenException('Company is inactive');
    }

    return true;
  }
}
