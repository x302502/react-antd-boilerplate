import type { AppRouteRecordRaw } from "~/router/types";

/** Sort routes in ascending order based on the 'order' property in routes */
export function ascending(arr: AppRouteRecordRaw[]) {
	return arr
		.map((routeItem, routeIndex) => ({
			...routeItem,
			handle: {
				...routeItem.handle,
				// When order doesn't exist, automatically create it based on sequence
				order: routeItem?.handle?.order || routeIndex + 2
			}
		}))
		.sort((a, b) => {
			return a?.handle?.order - b?.handle?.order;
		});
}
