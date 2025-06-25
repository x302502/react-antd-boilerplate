import type { MenuItemType } from "./types";

import { isString } from "~/utils";
import { cloneElement, isValidElement } from "react";

/**
 * 将菜单树中的所有 label 转换为国际化文本
 * @param menus 原始菜单数组
 * @param t Translation 函数
 * @returns 转换后的菜单数组
 */
export function translateMenus(
	menus: MenuItemType[],
	t: (key: string) => string
): MenuItemType[] {
	return menus.map((menu) => {
		let translatedLabel: React.ReactNode = menu.label;
		if (isValidElement(menu.label)) {
			translatedLabel = cloneElement(
				menu.label,
				{},
				t(menu.label.props.children)
			);
		}
		if (isString(menu.label)) {
			translatedLabel = t(menu.label);
		}
		const translatedMenu = {
			...menu,
			label: translatedLabel
		};

		if (menu.children && menu.children.length > 0) {
			translatedMenu.children = translateMenus(menu.children, t);
		}

		return translatedMenu;
	});
}

/**
 * 通过路径查找菜单
 *
 * @param list 菜单列表
 * @param path 菜单路径
 * @returns 找到的菜单对象，未找到则返回 null
 */
export function findMenuByPath(
	list: MenuItemType[],
	path?: string
): MenuItemType | null {
	for (const menu of list) {
		if (menu.key === path) {
			return menu;
		}
		const findMenu = menu.children && findMenuByPath(menu.children, path);
		if (findMenu) {
			return findMenu;
		}
	}
	return null;
}

/**
 * 通过路径查找根菜单
 *
 * @param menus 菜单列表
 * @param path 菜单路径，可选
 * @returns 包含查找到的菜单、根菜单和根菜单路径的对象
 */
export function findRootMenuByPath(
	menus: MenuItemType[],
	path?: string
): {
	findMenu: MenuItemType | null;
	rootMenu: MenuItemType | null;
	rootMenuPath: string | null;
} {
	// Initialize return values
	let findMenu: MenuItemType | null = null;
	let rootMenu: MenuItemType | null = null;
	let rootMenuPath: string | null = null;

	// If no path is provided, return default values
	if (!path) {
		return {
			findMenu: null,
			rootMenu: null,
			rootMenuPath: null
		};
	}

	// Recursive search function
	const find = (
		list: MenuItemType[],
		targetPath: string,
		parents: MenuItemType[] = []
	): boolean => {
		for (const menu of list) {
			// If target menu is found
			if (menu.key === targetPath) {
				findMenu = menu;
				// If there are no parent menus, the current menu is the root menu
				if (parents.length === 0) {
					rootMenu = menu;
					rootMenuPath = menu.key;
				} else {
					// Get the top-level parent menu
					rootMenu = parents[0];
					rootMenuPath = parents[0].key;
				}
				return true;
			}

			// If there are submenus, continue recursive search
			if (menu.children && menu.children.length > 0) {
				// Add current menu to the parent menu array
				const found = find(menu.children, targetPath, [...parents, menu]);
				if (found) {
					return true;
				}
			}
		}
		return false;
	};

	// Start searching
	find(menus, path);

	return {
		findMenu,
		rootMenu,
		rootMenuPath
	};
}

/**
 * 递归查找第一个子菜单路径下的最深层级的第一个菜单项
 *
 * @param splitSideNavItems 菜单列表
 * @returns 找到的最深层级的第一个菜单项
 */
export function findDeepestFirstItem(
	splitSideNavItems: MenuItemType[]
): MenuItemType | null {
	// If the list is empty, return null
	if (!splitSideNavItems || splitSideNavItems.length === 0) {
		return null;
	}

	// Get the first menu item
	const firstItem = splitSideNavItems[0];

	// If the current item has submenus, continue recursive search
	if (firstItem.children && firstItem.children.length > 0) {
		return findDeepestFirstItem(firstItem.children);
	}

	// If there are no more submenus, we've reached the deepest level, return the current item
	return firstItem;
}

/**
 * 判断目标键是否在子路由列表中
 *
 * @param menuItems 菜单项数组
 * @param targetKey 目标键
 * @returns 如果目标键在子路由列表中，则返回 true；否则返回 false
 */
export function findChildrenLen(menuItems: MenuItemType[], targetKey: string) {
	const subRouteChildren: string[] = [];

	for (const { children, key } of menuItems) {
		if (Array.isArray(children) && children.length) {
			subRouteChildren.push(key);
		}
	}

	return subRouteChildren.includes(targetKey);
}
