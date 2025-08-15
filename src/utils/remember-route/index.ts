import { LOGIN_PATH } from '~/views/@core/core.path';

export function rememberRoute() {
  const { pathname, search } = window.location;
  if (pathname.length > 1 && pathname !== LOGIN_PATH) {
    return `?redirect=${pathname}${search}`;
  }
  return '';
}
