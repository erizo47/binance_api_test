import type { RouteRecordRaw } from 'vue-router';
import { ERouteNames } from '@/router/ERouteNames';
import AppLayout from '@/layouts/AppLayout.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: ERouteNames.MAIN,
    component: AppLayout,
    redirect: {
      name: ERouteNames.CURRENCY,
    },
    children: [
      {
        path: 'currency',
        name: ERouteNames.CURRENCY,
        component: () => import('@/views/Main/Currency/index.vue'),
      },
      {
        path: 'order-book',
        name: ERouteNames.ORDER_BOOK,
        component: () => import('@/views/Main/OrderBook/index.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: ERouteNames.HANDLERS_UNKNOWN_PATH,
    redirect: {
      name: ERouteNames.ERROR_NOT_FOUND,
    },
  },
];

export default routes;
