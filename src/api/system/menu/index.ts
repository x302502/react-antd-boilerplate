import type { MenuItemType } from "./types";
import { request } from "~/utils";

export * from "./types";

/* Get menu list */
export function fetchMenuList(data: any) {
	return request
		.get<
			ApiListResponse<MenuItemType>
		>("menu-list", { searchParams: data, ignoreLoading: true })
		.json();
}

/* Add menu */
export function fetchAddMenuItem(data: MenuItemType) {
	return request
		.post<ApiResponse<string>>("menu-item", { json: data, ignoreLoading: true })
		.json();
}

/* Update menu */
export function fetchUpdateMenuItem(data: MenuItemType) {
	return request
		.put<ApiResponse<string>>("menu-item", { json: data, ignoreLoading: true })
		.json();
}

/* Delete menu */
export function fetchDeleteMenuItem(id: number) {
	return request
		.delete<ApiResponse<string>>("menu-item", { json: id, ignoreLoading: true })
		.json();
}
