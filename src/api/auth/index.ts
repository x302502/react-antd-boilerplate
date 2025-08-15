import type { PasswordLoginFormType } from '~/views/@core/auth/login/components/password-login';
import type { AppRouteRecordRaw } from '~/router/types';
import type { AuthType, RefreshTokenResult, UserInfoType } from './types';
import { fakeApiConnector } from '~/connectors';

export * from './types';

export const refreshTokenPath = 'refresh-token';
const ENDPOINT = {
  LOGIN: 'api/login',
  LOGOUT: 'api/logout',
  GET_ASYNC_ROUTES: 'api/get-async-routes',
  GET_USER_INFO: 'api/user-info',
  REFRESH_TOKEN: 'api/refresh-token',
};
class AuthApi {
  login = (data: PasswordLoginFormType) => {
    return fakeApiConnector.post<AuthType>(ENDPOINT.LOGIN, { ...data });
  };

  logout = () => {
    return fakeApiConnector.post(ENDPOINT.LOGOUT);
  };

  getAsyncRoutes = () => {
    return fakeApiConnector.get<AppRouteRecordRaw[]>(ENDPOINT.GET_ASYNC_ROUTES);
  };

  getUserInfo = () => {
    return fakeApiConnector.get<UserInfoType>(ENDPOINT.GET_USER_INFO);
  };

  refreshToken = (body: { readonly refreshToken: string }) => {
    return fakeApiConnector.post<RefreshTokenResult>(ENDPOINT.REFRESH_TOKEN, body);
  };
}
export const authApi = new AuthApi();
