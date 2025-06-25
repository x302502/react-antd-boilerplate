import { fetchAsyncRoutes } from "~/api/user";
import { useCurrentRoute } from "~/hooks";
import { hideLoading, setupLoading } from "~/plugins";
import {
	exception403Path,
	exception404Path,
	exception500Path,
	loginPath
} from "~/router/extra-info";
import { accessRoutes, whiteRouteNames } from "~/router/routes";
import { isSendRoutingRequest } from "~/router/routes/config";
import {
	generateRoutesByFrontend,
	generateRoutesFromBackend
} from "~/router/utils";
import {
	useAccessStore,
	useAuthStore,
	usePreferencesStore,
	useUserStore
} from "~/store";

import { useEffect } from "react";
import {
	matchRoutes,
	Navigate,
	useLocation,
	useNavigate,
	useSearchParams
} from "react-router";

import { removeDuplicateRoutes } from "./utils";

/**
 * Routes whitelist 1. No permission verification, 2. Will not trigger requests, such as user information interface
 * @example "privacy-policy", "terms-of-service" and so on.
 */
const noLoginWhiteList = Array.from(whiteRouteNames).filter(
	(item) => item !== loginPath
);

interface AuthGuardProps {
	children?: React.ReactNode;
}

/**
 * AuthGuard component, used for permission verification. The order of the code is important and should not be arbitrarily adjusted
 */
export function AuthGuard({ children }: AuthGuardProps) {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const currentRoute = useCurrentRoute();
	const { pathname, search } = useLocation();
	const isLogin = useAuthStore((state) => Boolean(state.token));
	const isAuthorized = useUserStore((state) => Boolean(state.id));
	const getUserInfo = useUserStore((state) => state.getUserInfo);
	const userRoles = useUserStore((state) => state.roles);
	const { setAccessStore, isAccessChecked, routeList } = useAccessStore();
	const { enableBackendAccess, enableFrontendAceess } = usePreferencesStore(
		(state) => state
	);

	const isPathInNoLoginWhiteList = noLoginWhiteList.includes(pathname);

	/**
	 * Fetch user information and route configuration asynchronously
	 */
	useEffect(() => {
		async function fetchUserInfoAndRoutes() {
			/**
			 * Login redirect, prevent flicker
			 */
			setupLoading();

			/**
			 * Initialize an empty array to hold Promise objects
			 */
			const promises = [];

			/**
			 * Fetch user information
			 */
			promises.push(getUserInfo());

			/**
			 * If backend routing is enabled and the route is obtained from a separate interface, then initiate a request
			 */
			if (enableBackendAccess && isSendRoutingRequest) {
				promises.push(fetchAsyncRoutes());
			}

			const results = await Promise.allSettled(promises);
			const [userInfoResult, routeResult] = results;
			const routes = [];
			const latestRoles = [];
			/**
			 * @zh Fetch role information from the user interface
			 * @en Fetch role information from the user interface
			 */
			if (
				userInfoResult.status === "fulfilled" &&
				"roles" in userInfoResult.value
			) {
				latestRoles.push(...(userInfoResult.value?.roles ?? []));
			}
			/**
			 * If backend routing is enabled and the route is obtained from the user interface
			 */
			if (
				enableBackendAccess &&
				!isSendRoutingRequest &&
				userInfoResult.status === "fulfilled" &&
				"menus" in userInfoResult.value
			) {
				routes.push(
					...(await generateRoutesFromBackend(
						userInfoResult.value?.menus ?? []
					))
				);
			}
			/**
			 * If backend routing is enabled and the route is obtained from a separate interface
			 */
			if (
				enableBackendAccess &&
				isSendRoutingRequest &&
				routeResult.status === "fulfilled" &&
				"result" in routeResult.value
			) {
				routes.push(
					...(await generateRoutesFromBackend(routeResult.value?.result ?? []))
				);
			}

			/**
			 * If frontend routing is enabled
			 */
			if (enableFrontendAceess) {
				routes.push(...generateRoutesByFrontend(accessRoutes, latestRoles));
			}

			const uniqueRoutes = removeDuplicateRoutes(routes);
			setAccessStore(uniqueRoutes);

			const hasError = results.some((result) => result.status === "rejected");
			/**
			 * Network request failed, redirect to 500 page
			 */
			if (hasError) {
				const unAuthorized = results.some(
					(result: any) => result.reason.response.status === 401
				);
				if (!unAuthorized) {
					return navigate(exception500Path);
				}
			}

			/**
			 *
			 * Under the condition of dynamic routing, do you need to replace the current route?
			 * 1. Browser navigation into a dynamic routing address, such as /system/user
			 * 2. The dynamic route is not added to the route, so the address bar is still /system/user but the matched route is the fallback (path = "*") route
			 * 3. After adding the dynamic route, use replace to replace the current route and trigger the program to match /system/user again
			 *
			 * Refer: https://router.vuejs.org/guide/advanced/dynamic-routing#Adding-routes
			 *
			 */
			navigate(`${pathname}${search}`, {
				replace: true,
				/**
				 * Ensure that the 404 page will not be displayed before replacing the route (login page, when switching network speed to 3G, the 404 page will flash)
				 */
				flushSync: true
			});
		}
		/**
		 * The logic of obtaining user information and routes is only executed under the following conditions
		 * 1. Not in the route whitelist
		 * 2. Logged in
		 * 3. Unable to obtain user information and route information
		 *
		 */
		if (!whiteRouteNames.includes(pathname) && isLogin && !isAuthorized) {
			fetchUserInfoAndRoutes();
		}
	}, [pathname, isLogin, isAuthorized]);

	/**
	 * @zh Route whitelist
	 * @en Route whitelist
	 * @see {noLoginWhiteList}
	 */
	if (isPathInNoLoginWhiteList) {
		hideLoading();
		return children;
	}

	/**
	 * @zh Processing logic under unlogged conditions
	 * @en Processing logic under unlogged conditions
	 */
	/* --------------- Start ------------------ */
	if (!isLogin) {
		hideLoading();
		// Not logged in and the target page is not the login page, redirect to the login page
		if (pathname !== loginPath) {
			// If pathname length is greater than 1, redirect to login page with current path, otherwise redirect directly to login page
			const redirectPath =
				pathname.length > 1
					? `${loginPath}?redirect=${pathname}${search}`
					: loginPath;
			return <Navigate to={redirectPath} replace />;
		}
		// Not logged in and the target page is the login page, keep the login page
		else {
			return children;
		}
	}
	/* --------------- End ------------------ */

	/**
	 * @zh Processing logic under logged conditions
	 * @en Processing logic under logged conditions
	 */
	/* --------------- Start ------------------ */

	/**
	 * @zh Under logged conditions, match the login route and jump to the home page
	 * Put it before user information, because the login route will not request user information, so put it in front to judge
	 *
	 * @en Under logged conditions, match the login route and jump to the home page
	 * Put it before user information, because the login route will not request user information, so put it in front to judge
	 */
	if (pathname === loginPath) {
		/**
		 * @example login?redirect=/system/user
		 */
		const redirectPath = searchParams.get("redirect");
		if (redirectPath?.length && redirectPath !== pathname) {
			return <Navigate to={redirectPath} replace />;
		}
		return <Navigate to={import.meta.env.VITE_BASE_HOME_PATH} replace />;
	}

	/**
	 * @zh Waiting for user information to be obtained
	 * @en  Waiting for user information to be obtained
	 */
	if (!isAuthorized) {
		return null;
	}
	/**
	 * @zh Waiting for route information to be obtained
	 * @en Waiting for route information to be obtained
	 */
	if (!isAccessChecked) {
		return null;
	}

	/**
	 * @zh Hide loading animation
	 * @en Hide loading animation
	 */
	hideLoading();

	/**
	 * @zh If it's the root route, redirect to the home page (redirect to the default home page after getting user information, to prevent requesting the user information interface twice)
	 * @en If it is the root route, jump to the home page (jump to the default home page after obtaining user information to prevent requesting twice for user information interface)
	 * @zh pathname returns a path relative to import.meta.env.BASE_URL, so this is the root route "/" relative to BASE_URL
	 * @en pathname returns the path relative to import.meta.env.BASE_URL, so here is the root route "/" relative to BASE_URL
	 */
	if (pathname === "/") {
		return <Navigate to={import.meta.env.VITE_BASE_HOME_PATH} replace />;
	}

	/* --------------- End ------------------ */

	/**
	 * @zh Route permission verification logic
	 * @en Route permission verification logic
	 */
	const routeRoles = currentRoute?.handle?.roles;
	const ignoreAccess = currentRoute?.handle?.ignoreAccess;

	/**
	 * @zh Ignore permission verification
	 * @en Ignore permission verification
	 */
	if (ignoreAccess === true) {
		return children;
	}

	const matches =
		matchRoutes(
			routeList,
			pathname
			/**
			 * @zh pathname returns a path relative to import.meta.env.BASE_URL, so there's no need to specify the third parameter basename
			 * @en pathname returns the path relative to import.meta.env.BASE_URL, so there is no need to specify the third parameter basename
			 */
		) ?? [];

	const hasChildren = matches[matches.length - 1]?.route?.children?.filter(
		(item) => !item.index
	)?.length;
	/**
	 * If the current route has sub-routes, jump to the 404 page
	 */
	if (hasChildren && hasChildren > 0) {
		return <Navigate to={exception404Path} replace />;
	}

	/**
	 * Role permission verification
	 */
	const hasRoutePermission = userRoles.some((role) =>
		routeRoles?.includes(role)
	);
	/**
	 * Role permission verification logic:
	 * 1. If there is no role on the route, it is considered as a permissionless route, equivalent to ignoreAccess being true
	 * 2. For routes that do not pass permission verification, cancel the current route navigation and jump to the 403 page
	 */
	if (routeRoles && routeRoles.length && !hasRoutePermission) {
		return <Navigate to={exception403Path} replace />;
	}

	return children;
}
/**
 * Steps to verify if route navigation is correct:
 * 1. When not logged in, enter login route
 * 2. When not logged in, enter a non-login route
 * 3. When logged in, use the system's logout function, then login again
 * 4. Choose any non-home page, use developer tools to clear localStorage, refresh the page and then login
 * 5. When logged in, enter login route
 * 6. When logged in, enter a non-login route
 * 7. When logged in, enter http://localhost:3333 to redirect to /home route, user API is sent once
 * 8. When logged in, enter http://localhost:3333/ to redirect to /home route, user API is sent once
 * 9. When logged in, enter http://localhost:3333/home to redirect to /home route, user API is sent once
 */
