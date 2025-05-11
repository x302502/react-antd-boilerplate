import type { AppRouteRecordRaw } from "~/router/types";
import { ContainerLayout } from "~/layout";

import { $t } from "~/locales";
import { home } from "~/router/extra-info";
import { HomeOutlined } from "@ant-design/icons";
import { createElement, lazy } from "react";

const Home = lazy(() => import("~/pages/home"));

const routes: AppRouteRecordRaw[] = [
	{
		path: "/home",
		Component: ContainerLayout,
		handle: {
			order: home,
			title: $t("common.menu.home"),
			icon: createElement(HomeOutlined)
		},
		children: [
			{
				index: true,
				Component: Home,
				handle: {
					title: $t("common.menu.home"),
					icon: createElement(HomeOutlined)
				}
			}
		]
	}
];

export default routes;
