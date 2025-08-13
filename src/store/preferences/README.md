# 📋 Hướng dẫn cấu hình Preferences Store

## 🎯 Tổng quan

File `preferences/index.ts` chứa tất cả cấu hình mặc định cho giao diện và tính năng của ứng dụng React Antd Admin. Đây là nơi bạn có thể tùy chỉnh toàn bộ trải nghiệm người dùng.

## ⚙️ Cấu hình chi tiết

### 🌐 **General (Cài đặt chung)**

| Thuộc tính             | Giá trị mặc định     | Mô tả                                                         |
| ---------------------- | -------------------- | ------------------------------------------------------------- |
| `watermark`            | `false`              | Bật/tắt watermark trên trang                                  |
| `watermarkContent`     | `"react-antd-admin"` | Nội dung watermark hiển thị                                   |
| `enableBackTopButton`  | `true`               | Hiển thị nút "Về đầu trang"                                   |
| `pageLayout`           | `"layout-right"`     | Bố cục trang (`layout-left`, `layout-right`, `layout-center`) |
| `enableBackendAccess`  | `false`              | **Quan trọng:** Load menu từ API backend                      |
| `enableFrontendAccess` | `true`               | **Quan trọng:** Load menu từ frontend routes                  |
| `language`             | `"vi-VN"`            | Ngôn ngữ giao diện (`vi-VN`, `en-US`, `zh-CN`)                |
| `enableDynamicTitle`   | `true`               | Thay đổi title trang theo route                               |
| `enableCheckUpdates`   | `true`               | Kiểm tra cập nhật tự động                                     |
| `checkUpdatesInterval` | `1`                  | Khoảng thời gian kiểm tra (giờ)                               |

### 🎨 **Theme (Giao diện)**

| Thuộc tính          | Giá trị mặc định | Mô tả                                       |
| ------------------- | ---------------- | ------------------------------------------- |
| `theme`             | `"auto"`         | Chế độ theme (`light`, `dark`, `auto`)      |
| `colorBlindMode`    | `false`          | Chế độ hỗ trợ người mù màu                  |
| `colorGrayMode`     | `false`          | Chế độ màu xám (grayscale)                  |
| `themeRadius`       | `6`              | Độ bo góc của các component (px)            |
| `builtinTheme`      | `"blue"`         | Theme có sẵn (`blue`, `green`, `red`, etc.) |
| `themeColorPrimary` | `"#1677ff"`      | Màu chủ đạo (hex code)                      |

### 🎬 **Animation (Hiệu ứng)**

| Thuộc tính           | Giá trị mặc định | Mô tả                                               |
| -------------------- | ---------------- | --------------------------------------------------- |
| `transitionProgress` | `true`           | Hiển thị thanh tiến trình khi chuyển trang          |
| `transitionLoading`  | `true`           | Hiệu ứng loading khi chuyển trang                   |
| `transitionEnable`   | `true`           | Bật/tắt tất cả hiệu ứng chuyển trang                |
| `transitionName`     | `"fade-slide"`   | Loại hiệu ứng (`fade`, `slide`, `fade-slide`, etc.) |

### 📐 **Layout (Bố cục)**

| Thuộc tính        | Giá trị mặc định  | Mô tả                                                                     |
| ----------------- | ----------------- | ------------------------------------------------------------------------- |
| `navigationStyle` | `SIDE_NAVIGATION` | Kiểu điều hướng (`SIDE_NAVIGATION`, `TOP_NAVIGATION`, `MIXED_NAVIGATION`) |

### 📑 **Tabbar (Thanh tab)**

| Thuộc tính           | Giá trị mặc định | Mô tả                                       |
| -------------------- | ---------------- | ------------------------------------------- |
| `tabbarEnable`       | `true`           | **Quan trọng:** Bật/tắt tính năng multi-tab |
| `tabbarShowIcon`     | `true`           | Hiển thị icon trên tab                      |
| `tabbarPersist`      | `true`           | Lưu trạng thái tab khi reload               |
| `tabbarDraggable`    | `true`           | Cho phép kéo thả tab                        |
| `tabbarStyleType`    | `"chrome"`       | Kiểu tab (`chrome`, `card`, `line`)         |
| `tabbarShowMore`     | `true`           | Hiển thị menu "More" khi có nhiều tab       |
| `tabbarShowMaximize` | `true`           | Hiển thị nút maximize tab                   |

### 📋 **Sidebar (Thanh bên)**

| Thuộc tính                              | Giá trị mặc định | Mô tả                                    |
| --------------------------------------- | ---------------- | ---------------------------------------- |
| `sidebarEnable`                         | `true`           | Bật/tắt sidebar                          |
| `sidebarWidth`                          | `210`            | Độ rộng sidebar khi mở (px)              |
| `sideCollapsedWidth`                    | `56`             | Độ rộng sidebar khi thu gọn (px)         |
| `sidebarCollapsed`                      | `false`          | Trạng thái thu gọn mặc định              |
| `sidebarCollapseShowTitle`              | `true`           | Hiển thị title khi thu gọn               |
| `sidebarExtraCollapsedWidth`            | `48`             | Độ rộng sidebar ở chế độ extra collapsed |
| `firstColumnWidthInTwoColumnNavigation` | `80`             | Độ rộng cột đầu trong chế độ 2 cột       |
| `sidebarTheme`                          | `"light"`        | Theme sidebar (`light`, `dark`)          |

### 🦶 **Footer (Chân trang)**

| Thuộc tính       | Giá trị mặc định                      | Mô tả                           |
| ---------------- | ------------------------------------- | ------------------------------- |
| `enableFooter`   | `true`                                | Hiển thị footer                 |
| `fixedFooter`    | `true`                                | Footer cố định ở cuối trang     |
| `companyName`    | `"Condor Hero"`                       | Tên công ty                     |
| `companyWebsite` | `"http://github.com/condorheroblog/"` | Website công ty                 |
| `copyrightDate`  | `"2023"`                              | Năm bản quyền                   |
| `ICPNumber`      | `""`                                  | Số ICP (cho website Trung Quốc) |
| `ICPLink`        | `""`                                  | Link ICP                        |

## 🔧 **Cách sử dụng**

### **1. Thay đổi cấu hình mặc định:**

```typescript
// Trong src/store/preferences/index.ts
export const DEFAULT_PREFERENCES = {
	// Thay đổi ngôn ngữ
	language: "en-US",

	// Tắt tabbar
	tabbarEnable: false,

	// Chuyển sang dark theme
	theme: "dark",

	// Thu gọn sidebar mặc định
	sidebarCollapsed: true
};
```

### **2. Sử dụng trong component:**

```typescript
import { usePreferencesStore } from "~/store";

function MyComponent() {
  const theme = usePreferencesStore(state => state.theme);
  const setTheme = usePreferencesStore(state => state.setTheme);

  return (
    <button onClick={() => setTheme("dark")}>
      Current theme: {theme}
    </button>
  );
}
```

## ⚠️ **Lưu ý quan trọng**

### **🔄 Menu Loading:**

- `enableBackendAccess: true` → Menu load từ API (`fake/async-routes.fake.ts`)
- `enableFrontendAccess: true` → Menu load từ routes trong `src/views/`

### **📑 Tabbar & KeepAlive:**

- `tabbarEnable: false` → Tắt cache trang, mọi trang sẽ reload khi chuyển
- `tabbarEnable: true` → Bật cache trang, giữ trạng thái khi chuyển tab

### **📱 Responsive:**

- Trên mobile, `navigationStyle` tự động chuyển về `SIDE_NAVIGATION`
- Sidebar tự động ẩn trên màn hình nhỏ

## 🎯 **Ví dụ cấu hình phổ biến**

### **Cấu hình cho Admin Dashboard:**

```typescript
{
  enableBackendAccess: true,
  tabbarEnable: true,
  sidebarWidth: 250,
  theme: "auto",
  navigationStyle: SIDE_NAVIGATION
}
```

### **Cấu hình cho Landing Page:**

```typescript
{
  enableFrontendAccess: true,
  tabbarEnable: false,
  enableFooter: true,
  fixedFooter: false,
  navigationStyle: TOP_NAVIGATION
}
```
