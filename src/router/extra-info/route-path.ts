/**
 * If route navigation is used in other places, extract the route path here for easier maintenance
 * This prevents forgetting to modify paths in other places when changing a path
 */

export const loginPath = "/login";
export const privacyPolicyPath = "/privacy-policy";
export const termsOfServicePath = "/terms-of-service";

export const exceptionPath = "/exception";
export const exception403Path = `${exceptionPath}/403`;
export const exception404Path = `${exceptionPath}/404`;
export const exception500Path = `${exceptionPath}/500`;
export const exceptionUnknownComponentPath = `${exceptionPath}/not-found-component`;
