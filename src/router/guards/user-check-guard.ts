import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export const userCheckGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  next();
};
