/**
 * @zh Remove trailing slash from path
 * @en Remove trailing slashes from a path
 * @param {string} pathname - The path to remove trailing slashes from
 * @returns {string} The path with trailing slashes removed
 * @example
 * removeTrailingSlash('/about/') // return '/about'
 * removeTrailingSlash('/about')  // return '/about'
 */
export function removeTrailingSlash(pathname: string) {
  return pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}
