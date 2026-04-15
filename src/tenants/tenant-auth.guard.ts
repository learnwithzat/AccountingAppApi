import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';

/**
 * Guard that ensures the authenticated user belongs to the tenant specified in the request context.
 * This guard should be used in conjunction with (and after) an authentication guard like JwtAuthGuard.
 */
@Injectable()
export class TenantAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const tenantId = request.tenantId;

    if (!user) {
      throw new UnauthorizedException('Authentication required');
    }

    if (!tenantId) {
      throw new ForbiddenException(
        'Tenant identification is required for this resource',
      );
    }

    // Compare the tenantId from the user's record/token with the one in the request context
    if (user.tenantId !== tenantId) {
      throw new ForbiddenException(
        'Access denied: User is not authorized for this tenant',
      );
    }

    return true;
  }
}
