import { useDeviceType } from '~/hooks';
import {
  MIXED_NAVIGATION,
  SIDE_NAVIGATION,
  TOP_NAVIGATION,
  TWO_COLUMN_NAVIGATION,
} from '~/layout/widgets/preferences/blocks/layout/constants';
import { usePreferencesStore } from '~/store';

import { useMemo } from 'react';

/**
 * Get the layout type information of the current page
 *
 * @returns Returns an object containing the current layout type information, including:
 * - currentLayout: Current navigation type
 * - isSideNav: Whether it is a side navigation
 * - isTopNav: Whether it is a top navigation
 * - isMixedNav: Whether it is a mixed navigation
 * - isTwoColumnNav: Whether it is a double column navigation
 */
export function useLayout() {
  const { isMobile } = useDeviceType();
  // LayoutType
  const navigationStyle = usePreferencesStore(state => state.navigationStyle);
  const sidebarWidth = usePreferencesStore(state => state.sidebarWidth);
  const sideCollapsedWidth = usePreferencesStore(state => state.sideCollapsedWidth);
  const firstColumnWidthInTwoColumnNavigation = usePreferencesStore(
    state => state.firstColumnWidthInTwoColumnNavigation,
  );

  /**
   * Current navigation type
   */
  const currentLayout = useMemo(() => (isMobile ? SIDE_NAVIGATION : navigationStyle), [isMobile, navigationStyle]);

  /**
   * Whether it is a side navigation
   */
  const isSideNav = useMemo(() => currentLayout === SIDE_NAVIGATION, [currentLayout]);

  /**
   * Whether it is a top navigation
   */
  const isTopNav = useMemo(() => currentLayout === TOP_NAVIGATION, [currentLayout]);

  /**
   * Whether it is a double column navigation
   */
  const isTwoColumnNav = useMemo(() => currentLayout === TWO_COLUMN_NAVIGATION, [currentLayout]);

  /**
   * Whether it is a mixed navigation
   */
  const isMixedNav = useMemo(() => currentLayout === MIXED_NAVIGATION, [currentLayout]);

  return {
    currentLayout,
    isSideNav,
    isTopNav,
    isMixedNav,
    isTwoColumnNav,
    sidebarWidth,
    sideCollapsedWidth,
    firstColumnWidthInTwoColumnNavigation,
  };
}
