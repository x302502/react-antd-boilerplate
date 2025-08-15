import type { ClassValue } from 'clsx';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper function để merge các className của Tailwind một cách thông minh
// - clsx(): gộp các class lại, bỏ qua các giá trị falsy (false, null, undefined, 0)
// - twMerge(): xử lý xung đột class của Tailwind (giữ class cuối cùng hợp lệ)
export function cn(...inputs: ClassValue[]) {
  // clsx() trả về string class đã gộp
  // twMerge() loại bỏ các class trùng/xung đột, giữ lại class ưu tiên
  return twMerge(clsx(inputs));
}
