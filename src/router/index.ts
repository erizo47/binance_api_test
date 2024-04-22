import { createRouter, createWebHistory } from 'vue-router';
import routes from '@/router/routes';
import { setPageTitleGuard } from '@/router/guards/set-page-title-guard';
import { fatalErrorGuard } from '@/router/guards/fatal-error-guard';

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(fatalErrorGuard);
router.afterEach(setPageTitleGuard);
export default router;
