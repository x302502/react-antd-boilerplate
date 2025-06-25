import { defineFakeRoute } from "vite-plugin-fake-server/client";

import { system } from "~/router/extra-info";
import { resultSuccess } from "./utils";

const systemMenu = [
	// System Management
	{
		id: system,
		menuType: 0, // Menu type (0 represents menu, 1 represents iframe, 2 represents external link, 3 represents button)
		name: "common.menu.system"
	},
	{
		parentId: system,
		id: system + 1,
		menuType: 0,
		name: "common.menu.user"
	},
	{
		parentId: system,
		id: system + 2,
		menuType: 0,
		name: "common.menu.role"
	},
	{
		parentId: system,
		id: system + 3,
		menuType: 0,
		name: "common.menu.menu"
	},
	{
		parentId: system,
		id: system + 4,
		menuType: 0,
		name: "common.menu.dept"
	},
	{
		parentId: system + 4,
		id: system + 4 + 1,
		menuType: 3,
		name: "common.add"
	},
	{
		parentId: system + 4,
		id: system + 4 + 2,
		menuType: 3,
		name: "common.edit"
	},
	{
		parentId: system + 4,
		id: system + 4 + 3,
		menuType: 3,
		name: "common.delete"
	}
];

export default defineFakeRoute([
	// Role Management
	{
		url: "/role-list",
		method: "get",
		response: ({ body }) => {
			let list = [
				{
					createTime: 1729752330782, // Timestamp (milliseconds)
					updateTime: 1729752330782,
					id: 1,
					name: "Super Administrator",
					code: "admin",
					status: 1, // Status: 1 enabled, 0 disabled
					remark: "Super Administrator has the highest permissions"
				},
				{
					createTime: 1729752330782,
					updateTime: 1729752330782,
					id: 2,
					name: "Regular Role",
					code: "common",
					status: 1,
					remark: "Regular Role has partial permissions"
				}
			];
			// list = Array.from({ length: 10000 }).flatMap(() => list);
			list = list.filter(
				(item) =>
					item.name.includes(body?.name ?? "") &&
					String(item.status).includes(String(body?.status ?? "")) &&
					(!body?.code || item.code === body?.code)
			);
			return resultSuccess({
				list,
				total: list.length, // Total number of items
				pageSize: 10, // Number of items displayed per page
				current: 1 // Current page number
			});
		}
	},
	// Role Management - Add Role
	{
		url: "/role-item",
		method: "post",
		response: ({ body }) => {
			return resultSuccess(body);
		}
	},
	// Role Management - Edit Role
	{
		url: "/role-item",
		method: "put",
		response: ({ body }) => {
			return resultSuccess(body);
		}
	},
	// Role Management - Delete Role
	{
		url: "/role-item",
		method: "delete",
		response: ({ body }) => {
			return resultSuccess(body);
		}
	},
	// Role Management - Permissions - Menu Permissions
	{
		url: "/role-menu",
		method: "get",
		response: () => {
			return resultSuccess(systemMenu);
		}
	},
	// Role Management - Permissions - Menu Permissions, query corresponding menus based on role id
	{
		url: "/menu-by-role-id",
		method: "get",
		response: ({ query }) => {
			if (query.id === "1") {
				return resultSuccess(systemMenu.map((item) => item.id));
			} else if (query.id === "2") {
				return resultSuccess([]);
			}
			return resultSuccess([]);
		}
	},
	// Menu Management
	{
		url: "/menu-list",
		method: "get",
		response: () => {
			const menuList = [
				// System Management
				{
					parentId: "", // Parent menu id
					id: system, // Menu id
					menuType: 0, // Menu type (0 represents menu, 1 represents iframe, 2 represents external link, 3 represents button)
					name: "common.menu.system", // Menu name
					path: "/system", // Route path
					component: "/system", // Component path
					order: system, // Menu order
					icon: "SettingOutlined", // Menu icon
					currentActiveMenu: "", // Active path
					iframeLink: "", // iframe link
					keepAlive: true, // Whether to cache the page
					externalLink: "", // External link address
					hideInMenu: false, // Whether to hide in menu
					ignoreAccess: false, // Whether to ignore permissions
					status: 1, // Status (0 disabled, 1 enabled)
					createTime: 1737023155965,
					updateTime: 1737023164653
				},
				{
					parentId: system,
					id: system + 1,
					menuType: 0,
					name: "common.menu.user",
					path: "/system/user", // Route path
					component: "/system/user", // Component path
					order: undefined, // Menu order
					icon: "UserOutlined", // Menu icon
					currentActiveMenu: "", // Active path
					iframeLink: "", // iframe link
					keepAlive: true, // Whether to cache the page
					externalLink: "", // External link address
					hideInMenu: false, // Whether to hide in menu
					ignoreAccess: false, // Whether to ignore permissions
					status: 1, // Status (0 disabled, 1 enabled)
					createTime: 1737023155965,
					updateTime: 1737023164653
				},
				{
					parentId: system,
					id: system + 2,
					menuType: 0,
					name: "common.menu.role",
					path: "/system/role", // Route path
					component: "/system/role", // Component path
					order: undefined, // Menu order
					icon: "TeamOutlined", // Menu icon
					currentActiveMenu: "", // Active path
					iframeLink: "", // iframe link
					keepAlive: true, // Whether to cache the page
					externalLink: "", // External link address
					hideInMenu: false, // Whether to hide in menu
					ignoreAccess: false, // Whether to ignore permissions
					status: 1, // Status (0 disabled, 1 enabled)
					createTime: 1737023155965,
					updateTime: 1737023164653
				},
				{
					parentId: system,
					id: system + 3,
					menuType: 0,
					name: "common.menu.menu",
					path: "/system/menu", // Route path
					component: "/system/menu", // Component path
					order: undefined, // Menu order
					icon: "MenuOutlined", // Menu icon
					currentActiveMenu: "", // Active path
					iframeLink: "", // iframe link
					keepAlive: true, // Whether to cache the page
					externalLink: "", // External link address
					hideInMenu: false, // Whether to hide in menu
					ignoreAccess: false, // Whether to ignore permissions
					status: 1, // Status (0 disabled, 1 enabled)
					createTime: 1737023155965,
					updateTime: 1737023164653
				},
				{
					parentId: system,
					id: system + 4,
					menuType: 0,
					name: "common.menu.dept",
					path: "/system/dept", // Route path
					component: "/system/dept", // Component path
					order: undefined, // Menu order
					icon: "ApartmentOutlined", // Menu icon
					currentActiveMenu: "", // Active path
					iframeLink: "", // iframe link
					keepAlive: true, // Whether to cache the page
					externalLink: "", // External link address
					hideInMenu: false, // Whether to hide in menu
					ignoreAccess: false, // Whether to ignore permissions
					status: 1, // Status (0 disabled, 1 enabled)
					createTime: 1737023155965,
					updateTime: 1737023164653
				},
				{
					parentId: system + 4,
					id: system + 4 + 1,
					menuType: 3,
					name: "common.add",
					status: 1, // Status (0 disabled, 1 enabled)
					createTime: 1737023155965,
					updateTime: 1737023164653
				},
				{
					parentId: system + 4,
					id: system + 4 + 2,
					menuType: 3,
					name: "common.edit",
					status: 1, // Status (0 disabled, 1 enabled)
					createTime: 1737023155965,
					updateTime: 1737023164653
				},
				{
					parentId: system + 4,
					id: system + 4 + 3,
					menuType: 3,
					name: "common.delete",
					status: 1, // Status (0 disabled, 1 enabled)
					createTime: 1737023155965,
					updateTime: 1737023164653
				}
			];
			return resultSuccess({
				list: menuList,
				total: menuList.length, // Total number of items
				pageSize: 10, // Number of items displayed per page
				current: 1 // Current page number
			});
		}
	},
	{
		url: "/menu-item",
		method: "post",
		response: () => {
			return resultSuccess({});
		}
	},
	{
		url: "/menu-item",
		method: "delete",
		response: () => {
			return resultSuccess({});
		}
	},
	{
		url: "/menu-item",
		method: "put",
		response: () => {
			return resultSuccess({});
		}
	}
]);
