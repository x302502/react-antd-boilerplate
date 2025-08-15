import type { AppRouteRecordRaw } from '~/router/types';

import { ServerErrorIcon } from '~/assets/icons';
import { ContainerLayout } from '~/layout';
import { $t } from '~/locales';

import { AppstoreOutlined, IssuesCloseOutlined, MinusSquareOutlined, StopOutlined } from '@ant-design/icons';
import { createElement, lazy } from 'react';
import {
  EXCEPTION_403_PATH,
  EXCEPTION_404_PATH,
  EXCEPTION_500_PATH,
  EXCEPTION_PATH,
  EXCEPTION_UNKNOWN_COMPONENT_PATH,
} from '../core.path';
import { MAIN_MENU_ORDER } from '~/views/main/main-menu.order';

const Exception403 = lazy(() => import('~/views/@core/exception/403'));
const Exception404 = lazy(() => import('~/views/@core/exception/404'));
const Exception500 = lazy(() => import('~/views/@core/exception/500'));
const ExceptionUnknownComponent = lazy(() => import('~/views/@core/exception/unknown-component'));

const routes: AppRouteRecordRaw[] = [
  {
    path: EXCEPTION_PATH,
    Component: ContainerLayout,
    handle: {
      order: MAIN_MENU_ORDER.EXCEPTION,
      // hideInMenu: true,
      title: $t('common.menu.exception'),
      icon: createElement(IssuesCloseOutlined),
    },
    children: [
      {
        path: EXCEPTION_403_PATH,
        Component: Exception403,
        handle: {
          title: $t('common.menu.exception_403'),
          icon: createElement(StopOutlined),
        },
      },
      {
        path: EXCEPTION_404_PATH,
        Component: Exception404,
        handle: {
          title: $t('common.menu.exception_404'),
          icon: createElement(MinusSquareOutlined),
        },
      },
      {
        path: EXCEPTION_500_PATH,
        Component: Exception500,
        handle: {
          title: $t('common.menu.exception_500'),
          icon: createElement(ServerErrorIcon),
        },
      },
      {
        path: EXCEPTION_UNKNOWN_COMPONENT_PATH,
        Component: ExceptionUnknownComponent,
        handle: {
          title: $t('common.menu.exceptionUnknownComponent'),
          icon: createElement(AppstoreOutlined),
        },
      },
    ],
  },
];

export default routes;
