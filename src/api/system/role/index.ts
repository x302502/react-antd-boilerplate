import type { RoleItemType } from "./types";
import { request } from "~/utils";

export * from "./types";

/* Get role list */
export function fetchRoleList(data: any) {
	return request
		.get<
			ApiListResponse<RoleItemType>
		>("role-list", { searchParams: data, ignoreLoading: true })
		.json();
}

/* Add role */
export function fetchAddRoleItem(data: RoleItemType) {
	return request
		.post<ApiResponse<string>>("role-item", { json: data, ignoreLoading: true })
		.json();
}

/* Update role */
export function fetchUpdateRoleItem(data: RoleItemType) {
	return request
		.put<ApiResponse<string>>("role-item", { json: data, ignoreLoading: true })
		.json();
}

/* Delete role */
export function fetchDeleteRoleItem(id: number) {
	return request
		.delete<ApiResponse<string>>("role-item", { json: id, ignoreLoading: true })
		.json();
}

/* Get menus */
export function fetchRoleMenu() {
	return request
		.get<ApiResponse<RoleItemType[]>>("role-menu", { ignoreLoading: true })
		.json();
}

/* Menu IDs bound to role */
export function fetchMenuByRoleId(data: { id: number }) {
	return request
		.get<
			ApiResponse<string[]>
		>("menu-by-role-id", { searchParams: data, ignoreLoading: false })
		.json();
}
