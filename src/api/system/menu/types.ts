export interface MenuItemType {
	parentId: string; // Parent menu id
	id: number; // Menu id
	menuType: 0 | 1 | 2 | 3; // Menu type (0 for menu, 1 for iframe, 2 for external link, 3 for button)
	name: string; // Menu name
	path: string; // Route path
	component: string; // Component path
	order: number; // Menu order
	icon: string; // Menu icon
	currentActiveMenu: string; // Active path
	iframeLink: string; // iframe link
	keepAlive: number; // Whether to cache page
	externalLink: string; // External link address
	hideInMenu: number; // Whether to hide in menu
	ignoreAccess: number; // Whether to ignore permissions
	status: 1; // Status (0 disabled, 1 enabled)
	createTime: number;
	updateTime: number;
}
