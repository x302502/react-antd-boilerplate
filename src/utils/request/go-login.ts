import { useAuthStore } from "~/store";
import { rememberRoute } from "~/utils";

/**
 * Redirect to login page
 *
 * @returns void
 */
export function goLogin() {
	// Reset login state
	useAuthStore.getState().reset();
	// Redirect to login page with route information to remember
	window.location.href = `${import.meta.env.BASE_URL}login${rememberRoute()}`;
}
