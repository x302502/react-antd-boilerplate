import type {
  MIXED_NAVIGATION,
  SIDE_NAVIGATION,
  TOP_NAVIGATION,
  TWO_COLUMN_NAVIGATION,
} from '~/layout/widgets/preferences/blocks/layout/constants';

import type { LanguageType } from '~/locales';
import type { MenuProps } from 'antd';

/**
 * @en Login page layout
 * @en Login page layout
 */
export type PageLayoutType = 'layout-left' | 'layout-center' | 'layout-right';
/**
 * @zh 标签栏风格
 * @en Tabbar style
 */
export type TabsStyleType = 'brisk' | 'card' | 'chrome' | 'plain';

/**
 * @en Theme type
 * @en Theme type
 */
export type ThemeType = 'dark' | 'light' | 'auto';

/**
 * @en Animation type
 * @en Animation type
 */
interface AnimationState {
  /**
   * @en Whether to enable transition animations
   * @en Whether to enable transition animation
   * @default true
   */
  transitionProgress: boolean;
  /**
   * @en Whether to enable loading animations
   * @en Whether to enable loading animation
   * @default true
   */
  transitionLoading: boolean;
  /**
   * @en Whether to enable animations
   * @en Whether to enable animation
   * @default true
   */
  transitionEnable: boolean;
  /**
   * @en Transition animation name
   * @en Transition animation name
   * @default "fade-slide"
   */
  transitionName: string;
}

export type NavigationType =
  | typeof SIDE_NAVIGATION
  | typeof TOP_NAVIGATION
  | typeof TWO_COLUMN_NAVIGATION
  | typeof MIXED_NAVIGATION;
export type BuiltinThemeType =
  | 'red'
  | 'volcano'
  | 'orange'
  | 'gold'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'cyan'
  | 'blue'
  | 'geekblue'
  | 'purple'
  | 'magenta'
  | 'gray'
  | 'custom';

interface LayoutState {
  navigationStyle: NavigationType;
}

export interface GeneralState {
  /**
   * @en Whether to enable watermark
   * @en Whether to enable watermark
   * @default false
   */
  watermark: boolean;
  /**
   * @en Watermark content
   * @en Watermark content
   * @default ""
   */
  watermarkContent: string;
  /**
   * @en Back to top action button
   * @en BackTop makes it easy to go back to the top of the page.
   * @default true
   */
  enableBackTopButton: boolean;
  /**
   * @en Login page layout configuration
   * @en Login page layout configuration
   * @default "layout-right"
   */
  pageLayout: PageLayoutType;
  /**
   * @en Enable frontend route permissions
   * @en Enable frontend route permissions
   * @default false
   */
  enableFrontendAceess: boolean;
  /**
   * @en Enable backend route permissions
   * @en Enable backend route permissions
   * @default true
   */
  enableBackendAccess: boolean;

  /**
   * @zh 当前语言
   * @en Current language
   * @default "zh-CN"
   */
  language: LanguageType;
  /**
   * @zh 是否开启动态标题
   * @en Whether to enable dynamic title
   * @default true
   */
  enableDynamicTitle: boolean;
  /**
   * @zh 是否开启更新检查
   * @en Whether to enable update check
   * @default true
   */
  enableCheckUpdates: boolean;
  /**
   * @zh 轮训时间，单位：分钟，默认 1 分钟
   * @en Polling time, unit: minute, default 1 minute
   * @default 1
   */
  checkUpdatesInterval: number;
}

export interface SidebarState {
  /**
   * Whether the sidebar is visible
   * @default true
   */
  sidebarEnable?: boolean;
  /**
   * Sidebar menu width
   * @default 210
   */
  sidebarWidth: number;
  /**
   * Collapsed sidebar menu width
   * @default 56
   */
  sideCollapsedWidth: number;
  /**
   * Sidebar menu collapse state
   * @default false
   */
  sidebarCollapsed: boolean;
  /**
   * Whether to show title when sidebar menu is collapsed
   * @default true
   */
  sidebarCollapseShowTitle: boolean;
  /**
   * Extra width for collapsed sidebar menu
   * @default 48
   */
  sidebarExtraCollapsedWidth: number;
  /**
   * Left menu width in two-column layout
   * @default 80
   */
  firstColumnWidthInTwoColumnNavigation: number;
  /**
   * Sidebar theme
   * @default dark
   */
  sidebarTheme: MenuProps['theme'];
}

export interface FooterState {
  enableFooter: boolean;
  fixedFooter: boolean;
  companyName: string;
  companyWebsite: string;
  copyrightDate: string;
  ICPNumber: string;
  ICPLink: string;
}

export interface PreferencesState extends AnimationState, LayoutState, GeneralState, SidebarState, FooterState {
  /* ================== Theme ================== */
  /**
   * @zh 当前主题
   * @en Current theme
   * @default "auto"
   */
  theme: ThemeType;
  /**
   * @zh 是否开启色弱模式
   * @en Whether to enable color-blind mode
   * @default false
   */
  colorBlindMode: boolean;
  /**
   * @zh 是否开启灰色模式
   * @en Whether to enable gray mode
   * @default false
   */
  colorGrayMode: boolean;
  /**
   * @zh 主题圆角值
   * @en Theme radius value
   * @default 6
   */
  themeRadius: number;
  /**
   * @zh 主题色
   * @en Theme color
   * @default "#1677ff" - blue
   */
  themeColorPrimary: string;
  /**
   * @zh 内置主题
   * @en Builtin theme
   * @default "blue"
   */
  builtinTheme: BuiltinThemeType;
  /* ================== Theme ================== */

  /* ================== Tabbar ================== */
  /**
   * @zh 标签栏风格
   * @en Tabbar style
   * @default "chrome"
   */
  tabbarStyleType: TabsStyleType;
  /**
   * @zh 是否启用标签栏
   * @en Whether to enable tabbar
   * @default true
   */
  tabbarEnable: boolean;
  /**
   * @zh 是否显示标签栏图标
   * @en Whether to show tabbar icon
   * @default true
   * @todo 待实现
   */
  tabbarShowIcon: boolean;
  /**
   * @zh 是否持久化标签栏
   * @en Whether to persist tabbar
   * @default true
   */
  tabbarPersist: boolean;
  /**
   * @zh 是否可拖拽标签栏
   * @en Whether to drag tabbar
   * @default true
   * @todo 待实现
   */
  tabbarDraggable: boolean;
  /**
   * @zh 是否显示更多
   * @en Whether to show more
   * @default true
   */
  tabbarShowMore: boolean;
  /**
   * @zh 是否显示最大化
   * @en Whether to show maximize
   * @default true
   */
  tabbarShowMaximize: boolean;
  /* ================== Tabbar ================== */
}
