import type { AppRouteRecordRaw } from '~/router/types';

import { filterTree } from '~/utils';

/**
 * Dynamically generate routes - Frontend approach
 */
export function generateRoutesByFrontend(routes: AppRouteRecordRaw[], roles: string[]) {
  // Filter route table based on role identifiers, determine if the current user has the specified permissions
  const finalRoutes = filterTree(routes, route => {
    return hasAuthority(route, roles);
  });

  return finalRoutes;
}

/**
 * Determine if a route has permission to access
 * @param route
 * @param accesses
 */
function hasAuthority(route: AppRouteRecordRaw, accesses: string[]) {
  const authority = route.handle?.roles;
  if (!authority) {
    return true;
  }
  return accesses.some(value => authority.includes(value));
}
