import type { AppRouteRecordRaw } from "~/router/types";
import { ContainerLayout } from "~/layout";
import { $t } from "~/locales";
import { demo } from "~/router/extra-info";

import { ExperimentOutlined } from "@ant-design/icons";
import { createElement, lazy } from "react";

const Demo = lazy(() => import("~/views/demo"));

const routes: AppRouteRecordRaw[] = [
	{
		path: "/demo",
		Component: ContainerLayout,
		handle: {
			order: demo,
			title: $t("common.menu.demo"),
			icon: createElement(ExperimentOutlined)
		},
		children: [
			{
				index: true,
				Component: Demo,
				handle: {
					title: $t("common.menu.demo"),
					icon: createElement(ExperimentOutlined)
				}
			}
		]
	}
];

export default routes;
