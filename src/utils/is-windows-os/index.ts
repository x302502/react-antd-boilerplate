/**
 * Check if the current operating environment is Windows OS.
 *
 * Determines the current operating environment by checking the navigator.userAgent string.
 */
export function isWindowsOs() {
  const windowsRegex = /windows|win32/i;
  return windowsRegex.test(navigator.userAgent);
}
