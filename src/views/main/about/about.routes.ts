import type { AppRouteRecordRaw } from '~/router/types';
import { ContainerLayout } from '~/layout';
import { $t } from '~/locales';
import { MAIN_MENU_ORDER } from '../main-menu.order';

import { CopyrightOutlined } from '@ant-design/icons';
import { createElement, lazy } from 'react';

const About = lazy(() => import('~/views/main/about'));

const routes: AppRouteRecordRaw[] = [
  {
    path: '/about',
    Component: ContainerLayout,
    handle: {
      order: MAIN_MENU_ORDER.ABOUT,
      title: $t('common.menu.about'),
      icon: createElement(CopyrightOutlined),
    },
    children: [
      {
        index: true,
        Component: About,
        handle: {
          // roles: ["common"],
          title: $t('common.menu.about'),
          icon: createElement(CopyrightOutlined),
        },
      },
    ],
  },
];

export default routes;
