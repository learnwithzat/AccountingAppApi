import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CompanyService } from '../../company/company.service';
import { Reflector } from '@nestjs/core';

/**
 * Guard that validates JWT and optionally checks company subscription
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(
    private readonly companyService: CompanyService,
    private readonly reflector: Reflector,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // First, run default JWT validation
    const isJwtValid = (await super.canActivate(context)) as boolean;
    if (!isJwtValid) return false;

    // Extract request
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user?.companyId) {
      throw new ForbiddenException('User does not belong to a company');
    }

    // Optional: Skip subscription check if route does not require it
    const requireSubscription = this.reflector.get<boolean>(
      'requireSubscription',
      context.getHandler(),
    );
    if (requireSubscription) {
      const company = await this.companyService.findById(user.companyId);
      if (!company?.isActiveSubscription) {
        throw new ForbiddenException('Company subscription is not active');
      }
    }

    return true;
  }
}
