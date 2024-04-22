import type { RouteLocationNormalized } from 'vue-router';

export const setPageTitleGuard = async (
  to: RouteLocationNormalized,
) => {
  const { title } = to.meta;
  const defaultTitle = 'interface';
  document.title = title ? `${defaultTitle} - ${title}` : defaultTitle;
};
