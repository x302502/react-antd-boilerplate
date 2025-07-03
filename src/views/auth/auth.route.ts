import type { AppRouteRecordRaw } from "~/router/types";

import { $t } from "~/locales";
import { loginPath } from "~/router/extra-info";

import { lazy } from "react";

const Login = lazy(() => import("~/views/auth/login"));

const routes: AppRouteRecordRaw[] = [
	{
		path: loginPath,
		Component: Login,
		handle: {
			hideInMenu: true,
			title: $t("authority.login")
		}
	}
];

export default routes;
