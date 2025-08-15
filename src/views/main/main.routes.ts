import type { AppRouteRecordRaw, RouteFileModule } from '~/router/types';
import { mergeRouteModules } from '~/router/utils';

const mainRouteFiles: RouteFileModule = import.meta.glob('./**/*.routes.ts', {
  eager: true,
});

/**
 * External routes 1. No permission verification, 2. Will not trigger requests, such as user information API
 * @example "privacy-policy", "terms-of-service", etc.
 */
export const mainRoutes: AppRouteRecordRaw[] = mergeRouteModules(mainRouteFiles);
