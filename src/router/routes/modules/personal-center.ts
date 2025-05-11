import type { AppRouteRecordRaw } from "~/router/types";
import { ProfileIcon, UserCircleIcon, UserSettingsIcon } from "~/icons";
import { ContainerLayout } from "~/layout";
import { $t } from "~/locales";
import { personalCenter } from "~/router/extra-info";

import { createElement, lazy } from "react";

const MyProfile = lazy(() => import("~/views/personal-center/my-profile"));
const Settings = lazy(() => import("~/views/personal-center/settings"));

const routes: AppRouteRecordRaw[] = [
	{
		path: "/personal-center",
		Component: ContainerLayout,
		handle: {
			order: personalCenter,
			title: $t("common.menu.personalCenter"),
			icon: createElement(UserCircleIcon)
		},
		children: [
			{
				path: "/personal-center/my-profile",
				Component: MyProfile,
				handle: {
					title: $t("common.menu.profile"),
					icon: createElement(ProfileIcon)
				}
			},
			{
				path: "/personal-center/settings",
				Component: Settings,
				handle: {
					title: $t("common.menu.settings"),
					icon: createElement(UserSettingsIcon)
				}
			}
		]
	}
];

export default routes;
