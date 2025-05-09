import type { AppRouteRecordRaw } from "#src/router/types";
import { ContainerLayout } from "#src/layout";
import { $t } from "#src/locales";
import { demo } from "#src/router/extra-info";

import { ExperimentOutlined } from "@ant-design/icons";
import { createElement, lazy } from "react";

const Demo = lazy(() => import("#src/pages/demo"));

const routes: AppRouteRecordRaw[] = [
	{
		path: "/demo",
		Component: ContainerLayout,
		handle: {
			order: demo,
			title: $t("common.menu.demo"),
			icon: createElement(ExperimentOutlined),
		},
		children: [
			{
				index: true,
				Component: Demo,
				handle: {
					title: $t("common.menu.demo"),
					icon: createElement(ExperimentOutlined),
				},
			},
		],
	},
];

export default routes;
