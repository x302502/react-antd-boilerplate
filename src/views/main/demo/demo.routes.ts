import type { AppRouteRecordRaw } from '~/router/types';
import { ContainerLayout } from '~/layout';
import { $t } from '~/locales';
import { MAIN_MENU_ORDER } from '~/views/main/main-menu.order';

import { ExperimentOutlined } from '@ant-design/icons';
import { createElement, lazy } from 'react';

const Demo = lazy(() => import('~/views/main/demo'));

const routes: AppRouteRecordRaw[] = [
  {
    path: '/demo',
    Component: ContainerLayout,
    handle: {
      order: MAIN_MENU_ORDER.DEMO,
      title: $t('common.menu.demo'),
      icon: createElement(ExperimentOutlined),
    },
    children: [
      {
        index: true,
        Component: Demo,
        handle: {
          title: $t('common.menu.demo'),
          icon: createElement(ExperimentOutlined),
        },
      },
    ],
  },
];

export default routes;
