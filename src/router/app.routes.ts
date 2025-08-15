import { ascending } from '~/router/utils';
import { traverseTreeValues } from '~/utils';
import { coreRoutes } from '~/views/@core/core.routes';
import { LOGIN_PATH } from '~/views/@core/core.path';
import { publicRoutes } from '~/views/public/public.routes';
import { mainRoutes } from '~/views/main/main.routes';

/**
 * Basic route list, composed of core routes and external routes, will always exist in the system
 */
const baseRoutes = ascending([...coreRoutes, ...publicRoutes]);

/** Permission route list, including main routes and public routes */
const accessRoutes = [...mainRoutes];

/**
 * Route whitelist 1. No permission verification, 2. Will not trigger requests, such as user information API
 * @example "privacy-policy", "terms-of-service", etc.
 */
const whiteRouteNames = [LOGIN_PATH, ...traverseTreeValues(publicRoutes, route => route.path)];

export { accessRoutes, baseRoutes, whiteRouteNames };
