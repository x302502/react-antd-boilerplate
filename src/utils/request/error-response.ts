import { isObject, message } from "~/utils";

/**
 * Handle error response
 *
 * @param response Response object
 * @returns Response object
 */
export async function handleErrorResponse(response: Response) {
	try {
		// Parse the response content as JSON format
		const data = await response.json();

		// Determine if the parsed data is an object type
		if (isObject(data)) {
			// Convert the parsed data to an object type containing error information
			const json = data as { errorMsg?: string; message?: string };

			// If the parsed data contains errorMsg or message property, display the error message
			// Otherwise, display the response status text as the error message
			message.error(json.errorMsg || json.message || response.statusText);
		} else {
			// If the parsed data is not an object type, directly display the response status text as the error message
			message.error(response.statusText);
		}
	} catch (e) {
		// If there is an error parsing the JSON format, print the error information to the console
		console.error("Error parsing JSON:", e);

		// Display the response status text as the error message
		message.error(response.statusText);
	}

	// Return the response object
	return response;
}
