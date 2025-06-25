import type { ReactNode } from "react";
import type {
	IndexRouteObject,
	NonIndexRouteObject,
	createBrowserRouter as RemixRouter
} from "react-router";

export interface IndexRouteMeta extends Omit<IndexRouteObject, "id"> {
	redirect?: string;
	handle: RouteMeta;
}
export interface NonIndexRouteMeta extends Omit<NonIndexRouteObject, "id"> {
	redirect?: string;
	handle: RouteMeta;
	children?: AppRouteRecordRaw[];
}

export type AppRouteRecordRaw = IndexRouteMeta | NonIndexRouteMeta;

export interface RouteMeta {
	/**
	 * Route title, typically used for page title or sidebar menu display
	 */
	title: ReactNode;

	/**
	 * Menu icon, used for displaying icons in sidebar menu items
	 */
	icon?: ReactNode;

	/**
	 * Menu ordering, used to control the display order of sidebar menu
	 */
	order?: number;

	/**
	 * Used to configure page permissions, only users with corresponding permissions can access the page. If not configured, no permissions are required.
	 */
	roles?: string[];

	/**
	 * Button-level permissions within the page, used to control the display and hiding of buttons within the page
	 */
	permissions?: string[];

	/**
	 * Set whether the page enables caching. When enabled, the page will be cached and not reloaded. Only effective when tabs are enabled.
	 * @default true
	 */
	keepAlive?: boolean;

	/**
	 * Whether to hide in menu, used to control certain routes not to be displayed in the sidebar menu
	 */
	hideInMenu?: boolean;

	/**
	 * iframe link, used when a route needs to load an external page in an iframe
	 */
	iframeLink?: string;

	/**
	 * External link, opens directly in a new tab when clicked
	 */
	externalLink?: string;

	/**
	 * Used to configure whether the page ignores permissions, allowing direct access
	 */
	ignoreAccess?: boolean;

	/**
	 * @description Specifies the currently active menu, suitable for activating parent menu in dynamic routing scenarios
	 * @example When navigating from parent route '/user/info' to child route '/user/info/1', you can manually specify to highlight the parent menu '/user/info'
	 */
	currentActiveMenu?: string;

	/**
	 * The current route is obtained from a backend API request
	 */
	backstage?: boolean;
}

export type ReactRouterType = ReturnType<typeof RemixRouter>;
export type RouterSubscriber = Parameters<ReactRouterType["subscribe"]>[0];
export type RouterState = ReactRouterType["state"];
export type RouterNavigate = ReactRouterType["navigate"];

// Using type aliases to extract common types
export type RouteFileModule = Record<string, { default: AppRouteRecordRaw[] }>;
