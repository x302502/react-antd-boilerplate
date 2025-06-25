import type { AppRouteRecordRaw } from "~/router/types";

/**
 * Add a unique ID to the route object, replacing the automatically generated route id. This ID defaults to the route's path
 * {
 *   path: '/dashboard',
 * }
 *
 * After transformation
 *
 * {
 *   path: '/dashboard',
 *   id: '/dashboard',
 * }
 */
export function addRouteIdByPath(routes: AppRouteRecordRaw[], parentId = "") {
	return routes.map((route) => {
		// If it's an index route, the id will be the parent path + "/"
		const newRoute = {
			...route,
			id: route.index ? `${parentId}/` : route.path
		};

		if (newRoute.children && newRoute.children.length > 0) {
			newRoute.children = addRouteIdByPath(newRoute.children, route.path);
		}

		return newRoute;
	});
}
