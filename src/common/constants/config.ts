import type { TFunction } from 'i18next';

/**
 * @description: 配置项
 */
export const TOKEN = 'admin_token'; // token名称
export const LANG = 'lang'; // Language
export const EMPTY_VALUE = '-'; // Empty value display

// Common component default values
export const MAX_TAG_COUNT = 'responsive'; // Maximum number of tags to display, responsive: adaptive

// Date formatting
export const DATE_FORMAT = 'YYYY-MM-DD';
export const TIME_FORMAT = 'YYYY-MM-DD hh:mm:ss';

// Initialize pagination data
export const INITIAL_PAGINATION = {
  current: 1,
  pageSize: 20,
};

// Add/Edit title
export function ADD_TITLE(t: TFunction, title?: string) {
  return t('public.createTitle', { title: title ?? '' });
}
export function EDIT_TITLE(t: TFunction, name: string, title?: string) {
  return `${t('public.editTitle', { title: title ?? '' })}${name ? `(${name})` : ''}`;
}
