import type { AppRouteRecordRaw } from "~/router/types";

export interface AuthType {
	token: string;
	refreshToken: string;
}

export interface UserInfoType {
	id: string;
	avatar: string;
	username: string;
	email: string;
	phoneNumber: string;
	description: string;
	roles: Array<string>;
	// Routes can be dynamically added here
	menus?: AppRouteRecordRaw[];
}

export interface AuthListProps {
	label: string;
	name: string;
	auth: string[];
}
