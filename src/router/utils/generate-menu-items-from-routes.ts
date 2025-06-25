import type { MenuItemType } from "~/layout/layout-menu/types";
import type { AppRouteRecordRaw } from "~/router/types";

import * as basicIcons from "~/icons";
import { isString } from "~/utils";

import * as antdIcons from "@ant-design/icons";
import { createElement } from "react";
import { Link } from "react-router";

const allAntdIcons: { [key: string]: any } = antdIcons;
const allBasicIcons: { [key: string]: any } = basicIcons;

/**
 * Generate menu items array based on route list
 *
 * @param routeList Route list, type is AppRouteRecordRaw array
 * @returns Returns menu items array, array element type is MenuItemType
 */
export function generateMenuItemsFromRoutes(routeList: AppRouteRecordRaw[]) {
	return routeList.reduce<MenuItemType[]>((acc, item) => {
		const label = item.handle?.title;
		const externalLink = item?.handle?.externalLink;
		const iconName = item?.handle?.icon;

		const menuItem: MenuItemType = {
			key: item.path!,
			label: externalLink
				? createElement(
						Link,
						{
							// Prevent event bubbling to avoid triggering the menu's click event
							onClick: (e) => {
								e.stopPropagation();
							},
							to: externalLink,
							target: "_blank",
							rel: "noopener noreferrer"
						},
						label
					)
				: label
		};
		if (iconName) {
			menuItem.icon = iconName;
			if (isString(iconName)) {
				if (allAntdIcons[iconName]) {
					menuItem.icon = createElement(allAntdIcons[iconName]);
				} else if (allBasicIcons[iconName]) {
					menuItem.icon = createElement(allBasicIcons[iconName]);
				} else {
					console.warn(
						`iconName: ${iconName} is not found in allAntdIcons or allBasicIcons`
					);
				}
			}
		}
		if (Array.isArray(item.children) && item.children.length > 0) {
			// Filter out non-home pages and routes that should not be displayed in the menu
			const noIndexRoute = item.children.filter(
				(route) => !route.index && !route?.handle?.hideInMenu
			);
			if (noIndexRoute.length > 0) {
				menuItem.children = generateMenuItemsFromRoutes(noIndexRoute);
			}
		}
		if (item?.handle?.hideInMenu) {
			return acc;
		}
		return [...acc, menuItem];
	}, []);
}
