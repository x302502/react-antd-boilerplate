import type { KyResponse, Options } from "ky";
import { fetchRefreshToken } from "~/api/user";

import { useAuthStore } from "~/store";
import ky from "ky";
import { AUTH_HEADER } from "./constants";
import { goLogin } from "./go-login";

let isRefreshing = false;

/**
 * Refresh token and retry request
 *
 * @param request Request object
 * @param options Request options
 * @param refreshToken Refresh token
 * @returns Response object
 * @throws Exception when token refresh fails
 */
export async function refreshTokenAndRetry(
	request: Request,
	options: Options,
	refreshToken: string
) {
	if (!isRefreshing) {
		isRefreshing = true;
		try {
			// Call fetchRefreshToken function to get new token and refreshToken using the provided refreshToken
			const freshResponse = await fetchRefreshToken({ refreshToken });
			// Extract new token from response
			const newToken = freshResponse.result.token;
			// Extract new refreshToken from response
			const newRefreshToken = freshResponse.result.refreshToken;
			// Save new token and refreshToken to userStore
			useAuthStore.setState({ token: newToken, refreshToken: newRefreshToken });
			// Call onRefreshed function with the new token
			onRefreshed(newToken);

			// Set the request's Authorization header with the new token
			// Retry the current request
			request.headers.set(AUTH_HEADER, `Bearer ${newToken}`);
			// Use the new token to resend the request
			return ky(request, options);
		} catch (error) {
			// Call onRefreshFailed function with the error object
			// refreshToken authentication failed, reject all pending requests
			onRefreshFailed(error);
			// Redirect to login page
			goLogin();
			// Throw error
			throw error;
		} finally {
			// Whether an error occurs or not, set isRefreshing to false
			isRefreshing = false;
		}
	} else {
		// Wait for token refresh to complete
		return new Promise<KyResponse>((resolve, reject) => {
			// Add refresh subscriber
			addRefreshSubscriber({
				// When token refresh succeeds, set the new token to the request's Authorization header and resend the request
				resolve: async (newToken) => {
					request.headers.set(AUTH_HEADER, `Bearer ${newToken}`);
					resolve(ky(request, options));
				},
				// When token refresh fails, reject the current Promise
				reject
			});
		});
	}
}

// Define an array to store all subscribers waiting for token refresh
// Each subscriber object contains resolve and reject methods, used when token refresh succeeds or fails
let refreshSubscribers: Array<{
	resolve: (token: string) => void; // Function called when token refresh succeeds, passing the new token
	reject: (error: any) => void; // Function called when token refresh fails, passing the error information
}> = [];

/**
 * When token refresh succeeds, notify all waiting subscribers.
 * Iterate through all subscribers, call their resolve method, and pass in the new token.
 * Then clear the subscriber list, preparing for the next token refresh.
 *
 * @param token The refreshed token string
 */
function onRefreshed(token: string) {
	refreshSubscribers.forEach((subscriber) => subscriber.resolve(token));
	refreshSubscribers = []; // Clear the subscriber list
}

/**
 * When token refresh fails, notify all waiting subscribers.
 * Iterate through all subscribers, call their reject method, and pass in the error information.
 * Then clear the subscriber list.
 *
 * @param error Error information generated when refresh fails
 */
function onRefreshFailed(error: any) {
	refreshSubscribers.forEach((subscriber) => subscriber.reject(error));
	refreshSubscribers = []; // Clear the subscriber list
}

/**
 * Add a new subscriber to the list.
 * The subscriber object should contain resolve and reject methods.
 *
 * @param subscriber Subscriber object containing resolve and reject methods
 */
function addRefreshSubscriber(subscriber: {
	resolve: (token: string) => void; // Function called when token refresh succeeds
	reject: (error: any) => void; // Function called when token refresh fails
}) {
	refreshSubscribers.push(subscriber); // Add the new subscriber to the list
}
