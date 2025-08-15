/**
 * If route navigation is used in other places, extract the route path here for easier maintenance
 * This prevents forgetting to modify paths in other places when changing a path
 */

export const LOGIN_PATH = '/login';

export const EXCEPTION_PATH = '/exception';
export const EXCEPTION_403_PATH = `${EXCEPTION_PATH}/403`;
export const EXCEPTION_404_PATH = `${EXCEPTION_PATH}/404`;
export const EXCEPTION_500_PATH = `${EXCEPTION_PATH}/500`;
export const EXCEPTION_UNKNOWN_COMPONENT_PATH = `${EXCEPTION_PATH}/not-found-component`;
