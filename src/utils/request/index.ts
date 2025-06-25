import type { Options } from "ky";
import { refreshTokenPath } from "~/api/user";

import { loginPath } from "~/router/extra-info";
import { useAuthStore, usePreferencesStore } from "~/store";
import ky from "ky";

import { AUTH_HEADER, LANG_HEADER } from "./constants";
import { handleErrorResponse } from "./error-response";
import { globalProgress } from "./global-progress";
import { goLogin } from "./go-login";
import { refreshTokenAndRetry } from "./refresh";

// Request whitelist, APIs in this whitelist do not need to carry a token
const requestWhiteList = [loginPath];

// Request timeout
const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 10000;

const defaultConfig: Options = {
	// The input argument cannot start with a slash / when using prefixUrl option.
	prefixUrl: import.meta.env.VITE_API_BASE_URL,
	timeout: API_TIMEOUT,
	retry: {
		// Maximum number of retries when a request fails
		limit: 3
	},
	hooks: {
		beforeRequest: [
			(request, options) => {
				const ignoreLoading = options.ignoreLoading;
				if (!ignoreLoading) {
					globalProgress.start();
				}
				// Requests that don't need to carry a token
				const isWhiteRequest = requestWhiteList.some((url) =>
					request.url.endsWith(url)
				);
				if (!isWhiteRequest) {
					const { token } = useAuthStore.getState();
					request.headers.set(AUTH_HEADER, `Bearer ${token}`);
				}
				// Language needs to be carried by all API interfaces
				request.headers.set(
					LANG_HEADER,
					usePreferencesStore.getState().language
				);
			}
		],
		afterResponse: [
			async (request, options, response) => {
				const ignoreLoading = options.ignoreLoading;
				if (!ignoreLoading) {
					globalProgress.done();
				}
				// Request error
				if (!response.ok) {
					if (response.status === 401) {
						// Prevent infinite loop caused by continuing to receive 401 errors when refreshing the refresh-token
						if (
							[`/${refreshTokenPath}`].some((url) => request.url.endsWith(url))
						) {
							goLogin();
							return response;
						}
						// If the token is expired, refresh it and try again.
						const { refreshToken } = useAuthStore.getState();
						// If there is no refresh token, it means that the user has not logged in.
						if (!refreshToken) {
							// If the page route has already been redirected to the login page, return the result directly without redirecting
							if (location.pathname === loginPath) {
								return response;
							} else {
								goLogin();
								return response;
							}
						}

						return refreshTokenAndRetry(request, options, refreshToken);
					} else {
						return handleErrorResponse(response);
					}
				}
				// Request success
				return response;
			}
		]
	}
};

export const request = ky.create(defaultConfig);
