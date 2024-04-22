import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export const fatalErrorGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  next();
};
