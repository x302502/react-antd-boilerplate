import { useGlobalStore } from "~/store";

// Define a global variable to track how many requests are currently in progress
let requestCount = 0;

export const globalProgress = {
	/**
	 * Start request
	 *
	 * If the request count is 0, show the global loading animation and increment the request count by 1.
	 */
	start() {
		if (requestCount === 0) {
			// Show global loading animation
			useGlobalStore.getState().openGlobalSpin();
		}
		// Increment request count by 1
		requestCount++;
	},

	/**
	 * Callback function after request completion
	 *
	 * @description Decrements the request count by 1, and ensures the request count is not less than 0;
	 *              If the request count is 0, hide the global loading animation
	 */
	done() {
		// Decrement request count by 1, but ensure the request count is not less than 0
		requestCount = Math.max(requestCount - 1, 0);
		if (requestCount === 0) {
			// Hide global loading animation
			useGlobalStore.getState().closeGlobalSpin();
		}
	},

	/**
	 * Force complete all requests
	 *
	 * Set the request count directly to 0 and hide the global loading animation
	 */
	forceFinish() {
		// Set the request count directly to 0
		requestCount = 0;
		// Hide global loading animation
		useGlobalStore.getState().closeGlobalSpin();
	}
};
