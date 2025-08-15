import type { AppRouteRecordRaw } from '~/router/types';
import { ContainerLayout, ParentLayout } from '~/layout';
import { MAIN_MENU_ORDER } from '../main-menu.order';
import { $t } from '~/locales';

import { NodeExpandOutlined, SisternodeOutlined, SubnodeOutlined } from '@ant-design/icons';
import { createElement, lazy } from 'react';
import {
  ROUTE_NEST_MENU2_PATH,
  ROUTE_NEST_MENU1_MENU11_PATH,
  ROUTE_NEST_MENU1_MENU12_PATH,
  ROUTE_NEST_MENU1_PATH,
  ROUTE_NEST_PATH,
} from './route-nest.path';

const Menu1And1 = lazy(() => import('~/views/main/route-nest/menu1/menu1-1'));
const Menu1And2 = lazy(() => import('~/views/main/route-nest/menu1/menu1-2'));
const Menu2 = lazy(() => import('~/views/main/route-nest/menu2'));

const routes: AppRouteRecordRaw[] = [
  {
    path: ROUTE_NEST_PATH,
    Component: ContainerLayout,
    handle: {
      order: MAIN_MENU_ORDER.ROUTE_NEST,
      title: $t('common.menu.nestMenus'),
      icon: createElement(NodeExpandOutlined),
    },
    children: [
      {
        path: ROUTE_NEST_MENU1_PATH,
        Component: ParentLayout,
        handle: {
          title: $t('common.menu.menu1'),
          icon: createElement(SisternodeOutlined),
        },
        children: [
          {
            path: ROUTE_NEST_MENU1_MENU11_PATH,
            Component: Menu1And1,
            handle: {
              title: $t('common.menu.menu1-1'),
              icon: createElement(SubnodeOutlined),
            },
          },
          {
            path: ROUTE_NEST_MENU1_MENU12_PATH,
            Component: Menu1And2,
            handle: {
              title: $t('common.menu.menu1-2'),
              icon: createElement(SubnodeOutlined),
            },
          },
        ],
      },
      {
        path: ROUTE_NEST_MENU2_PATH,
        Component: Menu2,
        handle: {
          title: $t('common.menu.menu2'),
          icon: createElement(SubnodeOutlined),
        },
      },
    ],
  },
];

export default routes;
