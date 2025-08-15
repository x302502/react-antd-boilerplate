import type { AppRouteRecordRaw } from '~/router/types';

import { accessControlCodes } from '~/hooks/use-access/constants';
import { ContainerLayout } from '~/layout';
import { $t } from '~/locales';
import { MAIN_MENU_ORDER } from '../main-menu.order';

import { lazy } from 'react';
import {
  ACCESS_ADMIN_VISIBLE_PATH,
  ACCESS_BUTTON_CONTROL_PATH,
  ACCESS_COMMON_VISIBLE_PATH,
  ACCESS_PAGE_CONTROL_PATH,
  ACCESS_PATH,
} from './access.path';

const PageControl = lazy(() => import('~/views/main/access/page-control'));
const ButtonControl = lazy(() => import('~/views/main/access/button-control'));
const AdminVisible = lazy(() => import('~/views/main/access/admin-visible'));
const CommonVisible = lazy(() => import('~/views/main/access/common-visible'));

const routes: AppRouteRecordRaw[] = [
  {
    path: ACCESS_PATH,
    Component: ContainerLayout,
    handle: {
      icon: 'SafetyOutlined',
      title: $t('common.menu.access'),
      order: MAIN_MENU_ORDER.ACCESS,
    },
    children: [
      {
        path: ACCESS_PAGE_CONTROL_PATH,
        Component: PageControl,
        handle: {
          icon: 'FileTextOutlined',
          title: $t('common.menu.pageControl'),
          permissions: [accessControlCodes.get],
        },
      },
      {
        path: ACCESS_BUTTON_CONTROL_PATH,
        Component: ButtonControl,
        handle: {
          icon: 'LockOutlined',
          title: $t('common.menu.buttonControl'),
        },
      },
      {
        path: ACCESS_ADMIN_VISIBLE_PATH,
        Component: AdminVisible,
        handle: {
          icon: 'EyeOutlined',
          title: $t('common.menu.adminVisible'),
          roles: ['admin'],
        },
      },
      {
        path: ACCESS_COMMON_VISIBLE_PATH,
        Component: CommonVisible,
        handle: {
          icon: 'EyeOutlined',
          title: $t('common.menu.commonVisible'),
          roles: ['common'],
        },
      },
    ],
  },
];

export default routes;
