/** @format */

import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

//////////////////////////////////////////////////////
// USER TYPE (SHARED)
//////////////////////////////////////////////////////
export interface RequestedUser {
  id: string;
  tenantId: string;
  role: string;
  email?: string;
  permissions?: string[];
}

//////////////////////////////////////////////////////
// REQUEST TYPE
//////////////////////////////////////////////////////
interface AuthenticatedRequest extends Request {
  user?: RequestedUser;
}

//////////////////////////////////////////////////////
// DECORATOR
//////////////////////////////////////////////////////
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): RequestedUser => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();

    if (!request.user) {
      throw new UnauthorizedException('User not found in request');
    }

    return request.user;
  },
);
