import type { RouteObject } from "react-router";

import { addRouteIdByPath } from "~/router/utils";

import authRoutes from "../../../views/auth/auth.route";
import exceptionRoutes from "../../../views/exception/exception.route";
import fallbackRoute from "./fallback.route";

/** Core routes */
export const coreRoutes: any = [
	...addRouteIdByPath([...authRoutes, ...exceptionRoutes]),
	...fallbackRoute
] satisfies RouteObject[];
