import { SetMetadata } from '@nestjs/common';

/**
 * Marks a route as requiring active subscription
 */
export const RequireSubscription = () =>
  SetMetadata('requireSubscription', true);
