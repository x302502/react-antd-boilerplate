import { defineFakeRoute } from 'vite-plugin-fake-server/client';

import { ADMIN_REFRESH_TOKEN, ADMIN_TOKEN, COMMON_REFRESH_TOKEN, COMMON_TOKEN, COUNTRIES_CODE } from './constants';

export default defineFakeRoute([
  {
    url: '/login',
    timeout: 0,
    method: 'post',
    response: ({ body }) => {
      if (body.username !== 'common') {
        return {
          token: ADMIN_TOKEN,
          refreshToken: ADMIN_REFRESH_TOKEN,
        };
      } else {
        return {
          token: COMMON_TOKEN,
          refreshToken: COMMON_REFRESH_TOKEN,
        };
      }
    },
  },
  {
    url: '/logout',
    timeout: 1000,
    method: 'post',
    response: () => {
      return {};
    },
  },
  {
    url: '/refresh-token',
    timeout: 1000,
    method: 'post',
    response: ({ body }) => {
      if (body.refreshToken === ADMIN_REFRESH_TOKEN) {
        return {
          token: ADMIN_TOKEN,
          refreshToken: ADMIN_REFRESH_TOKEN,
        };
      }
      return {
        token: COMMON_TOKEN,
        refreshToken: COMMON_REFRESH_TOKEN,
      };
    },
  },
  {
    url: '/country-calling-codes',
    timeout: 1000,
    method: 'get',
    response: () => {
      return COUNTRIES_CODE;
    },
  },
]);
