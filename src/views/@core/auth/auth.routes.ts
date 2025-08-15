import type { AppRouteRecordRaw } from '~/router/types';

import { $t } from '~/locales';

import { lazy } from 'react';
import { LOGIN_PATH } from '../core.path';

const Login = lazy(() => import('~/views/@core/auth/login'));

const routes: AppRouteRecordRaw[] = [
  {
    path: LOGIN_PATH,
    Component: Login,
    handle: {
      hideInMenu: true,
      title: $t('authority.login'),
    },
  },
];

export default routes;
