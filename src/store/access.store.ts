import type { MenuItemType } from '~/layout/layout-menu/types';
import type { AppRouteRecordRaw } from '~/router/types';

import { rootRoute, router } from '~/router';
import { ROOT_ROUTE_ID } from '~/router/config/constants';
import { baseRoutes } from '~/router/app.routes';
import { ascending, flattenRoutes, generateMenuItemsFromRoutes } from '~/router/utils';

import { create } from 'zustand';

interface AccessState {
  // Route menu
  wholeMenus: MenuItemType[];
  // Authorized React Router routes
  routeList: AppRouteRecordRaw[];
  // Flattened routes, with route id as the index key
  flatRouteList: Record<string, AppRouteRecordRaw>;
  // Whether permissions have been obtained
  isAccessChecked: boolean;
}

const initialState: AccessState = {
  wholeMenus: generateMenuItemsFromRoutes(baseRoutes),
  routeList: baseRoutes,
  flatRouteList: flattenRoutes(baseRoutes),
  isAccessChecked: false,
};

interface AccessAction {
  setAccessStore: (routes: AppRouteRecordRaw[]) => AccessState;
  reset: () => void;
}

export const useAccessStore = create<AccessState & AccessAction>(set => ({
  ...initialState,

  setAccessStore: routes => {
    const newRoutes = ascending([...baseRoutes, ...routes]);
    /* Add new routes to the root route */
    router.patchRoutes(ROOT_ROUTE_ID, routes);
    const flatRouteList = flattenRoutes(newRoutes);
    const wholeMenus = generateMenuItemsFromRoutes(newRoutes);
    const newState = {
      wholeMenus,
      routeList: newRoutes,
      flatRouteList,
      isAccessChecked: true,
    };
    set(() => newState);
    return newState;
  },

  reset: () => {
    /* Remove dynamic routes */
    router._internalSetRoutes(rootRoute);
    set(initialState);
  },
}));
