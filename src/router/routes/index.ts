import type { AppRouteRecordRaw, RouteFileModule } from "~/router/types";

import { loginPath } from "~/router/extra-info";
import { ascending, mergeRouteModules } from "~/router/utils";
import { traverseTreeValues } from "~/utils";
import { coreRoutes } from "./core";

// External route files
export const externalRouteFiles: RouteFileModule = import.meta.glob(
	"./external/**/*.ts",
	{ eager: true }
);
// Frontend static route files
export const staticRouteFiles: RouteFileModule = import.meta.glob(
	"./static/**/*.ts",
	{ eager: true }
);

/**
 * Backend dynamic route files
 */
export const dynamicRouteFiles: RouteFileModule = import.meta.glob(
	"../../views/**/*.route.ts",
	{ eager: true }
);

/**
 * External routes 1. No permission verification, 2. Will not trigger requests, such as user information API
 * @example "privacy-policy", "terms-of-service", etc.
 */
export const externalRoutes: AppRouteRecordRaw[] =
	mergeRouteModules(externalRouteFiles);

/** Dynamic routes */
export const dynamicRoutes: AppRouteRecordRaw[] =
	mergeRouteModules(dynamicRouteFiles);

/** Static routes */
export const staticRoutes: AppRouteRecordRaw[] =
	mergeRouteModules(staticRouteFiles);

/**
 * Basic route list, composed of core routes and external routes, will always exist in the system
 */
const baseRoutes = ascending([...coreRoutes, ...externalRoutes]);

/** Permission route list, including dynamic routes and static routes */
const accessRoutes = [...dynamicRoutes, ...staticRoutes];

/**
 * Route whitelist 1. No permission verification, 2. Will not trigger requests, such as user information API
 * @example "privacy-policy", "terms-of-service", etc.
 */
const whiteRouteNames = [
	loginPath,
	...traverseTreeValues(externalRoutes, (route) => route.path)
];

export { accessRoutes, baseRoutes, whiteRouteNames };
