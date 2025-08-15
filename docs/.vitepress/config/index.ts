import { defineConfig } from 'vitepress';
import { shared } from './shared';
import { vi } from './vi';
import { zh } from './zh';

export default defineConfig({
  ...shared,
  locales: {
    root: { label: 'Tiếng Việt', ...vi },
    // vi: { label: 'Tiếng Việt', ...vi },
    zh: { label: '简体中文', ...zh },
  },
});
