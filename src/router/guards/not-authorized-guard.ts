import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export const notAuthorizedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  next();
};
