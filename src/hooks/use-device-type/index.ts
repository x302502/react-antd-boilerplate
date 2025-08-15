import { useResponsive } from 'ahooks';

/**
 * 判断当前设备类型（移动设备、iPad、PC 等）
 *
 */
export function useDeviceType() {
  // If using useBreakpoint, note that the behavior of useResponsive and antd's useBreakpoint xs is inconsistent
  /**
   * useResponsive 默认的断点为：
   * @see https://ahooks.js.org/hooks/use-responsive
   * {
   *   xs: 0,
   *   sm: 576,
   *   md: 768,
   *   lg: 992,
   *   xl: 1200,
   * }
   */
  const responsive = useResponsive();
  const isMobile = (responsive.xs && !responsive.sm) || (responsive.sm && !responsive.md);
  const isIpad = responsive.md && !responsive.xl;
  const isPC = responsive.xl;

  return { isMobile, isIpad, isPC };
}
