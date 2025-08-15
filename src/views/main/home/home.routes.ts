import type { AppRouteRecordRaw } from '~/router/types';
import { ContainerLayout } from '~/layout';

import { $t } from '~/locales';
import { MAIN_MENU_ORDER } from '~/views/main/main-menu.order';
import { HomeOutlined } from '@ant-design/icons';
import { createElement, lazy } from 'react';

const Home = lazy(() => import('~/views/main/home'));

const routes: AppRouteRecordRaw[] = [
  {
    path: '/home',
    Component: ContainerLayout,
    handle: {
      order: MAIN_MENU_ORDER.HOME,
      title: $t('common.menu.home'),
      icon: createElement(HomeOutlined),
    },
    children: [
      {
        index: true,
        Component: Home,
        handle: {
          title: $t('common.menu.home'),
          icon: createElement(HomeOutlined),
        },
      },
    ],
  },
];

export default routes;
