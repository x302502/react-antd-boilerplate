import type { AppRouteRecordRaw } from '~/router/types';
import { ProfileIcon, UserCircleIcon, UserSettingsIcon } from '~/assets/icons';
import { ContainerLayout } from '~/layout';
import { $t } from '~/locales';

import { createElement, lazy } from 'react';
import {
  PERSONAL_CENTER_MY_PROFILE_PATH,
  PERSONAL_CENTER_PATH,
  PERSONAL_CENTER_SETTINGS_PATH,
} from './personal-center.path';
import { MAIN_MENU_ORDER } from '../main-menu.order';

const MyProfile = lazy(() => import('~/views/main/personal-center/my-profile'));
const Settings = lazy(() => import('~/views/main/personal-center/settings'));

const routes: AppRouteRecordRaw[] = [
  {
    path: PERSONAL_CENTER_PATH,
    Component: ContainerLayout,
    handle: {
      order: MAIN_MENU_ORDER.PERSONAL_CENTER,
      title: $t('common.menu.personalCenter'),
      icon: createElement(UserCircleIcon),
      hideInMenu: true,
    },
    children: [
      {
        path: PERSONAL_CENTER_MY_PROFILE_PATH,
        Component: MyProfile,
        handle: {
          title: $t('common.menu.profile'),
          icon: createElement(ProfileIcon),
        },
      },
      {
        path: PERSONAL_CENTER_SETTINGS_PATH,
        Component: Settings,
        handle: {
          title: $t('common.menu.settings'),
          icon: createElement(UserSettingsIcon),
        },
      },
    ],
  },
];

export default routes;
