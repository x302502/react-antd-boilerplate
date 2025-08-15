import type { RouteObject } from 'react-router';

import { addRouteIdByPath } from '~/router/utils';

import authRoutes from './auth/auth.routes';
import exceptionRoutes from './exception/exception.routes';
import fallbackRoutes from './exception/fallback.routes';

/** Core routes */
export const coreRoutes: any = [
  ...addRouteIdByPath([...authRoutes, ...exceptionRoutes]),
  ...fallbackRoutes,
] satisfies RouteObject[];
