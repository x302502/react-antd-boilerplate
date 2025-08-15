import type { GlobalToken } from 'antd';
import { baseColorPalettes, neutralColors, prefix, productLevelColorSystem } from './constants';

/**
 * 16 进制颜色值转 RGB 颜色值，因为 16 进制的颜色值在 tailwind 中不支持透明度，比如无法使用 bg-blue-500/20
 * @see https://tailwindcss.com/docs/customizing-colors#using-css-variables
 */
export function hexToRGB(hex: string) {
  // Remove the possible # symbol
  hex = hex.replace('#', '');

  // Get the R, G, B values
  const r = Number.parseInt(hex.substring(0, 2), 16);
  const g = Number.parseInt(hex.substring(2, 4), 16);
  const b = Number.parseInt(hex.substring(4, 6), 16);

  return `${r} ${g} ${b}`;
}

// Determine if it's an RGB color value
export function isRGBColor(color: string) {
  return color.trim().startsWith('rgb');
}

export function getCSSVariablesByTokens(tokens: GlobalToken) {
  return Object.entries(tokens).reduce((acc, [key, value]): string => {
    // Functional color system, not including neutral colors
    if (productLevelColorSystem.includes(key)) {
      const rgb = hexToRGB(value);
      return `${acc}--${prefix}-${key}:${rgb};`;
    }

    // Neutral color system
    if (neutralColors.includes(key)) {
      // If the color value is in rgb format, use it directly
      const rgb = isRGBColor(value) ? value : `rgb(${hexToRGB(value)})`;
      return `${acc}--${prefix}-${key}:${rgb};`;
    }
    // Color palette
    return baseColorPalettes.includes(key) ? `${acc}--${prefix}-${key}:${hexToRGB(value)};` : acc;
  }, '');
}
