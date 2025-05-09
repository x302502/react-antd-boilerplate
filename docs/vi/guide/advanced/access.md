# Kiểm soát quyền truy cập {#access-control}

Kiểm soát quyền truy cập là một phần quan trọng của bất kỳ ứng dụng quản trị nào. React Antd Admin cung cấp một hệ thống kiểm soát quyền truy cập toàn diện để quản lý quyền truy cập của người dùng vào các trang và chức năng khác nhau.

## Cơ chế kiểm soát quyền

Hệ thống kiểm soát quyền truy cập của React Antd Admin hoạt động dựa trên hai khái niệm chính:

1. **Vai trò (Roles)**: Các nhóm quyền được gán cho người dùng.
2. **Mã quyền (Access Codes)**: Các quyền cụ thể được gán cho các tính năng hoặc trang.

## Cấu hình quyền

Quyền được cấu hình trong store `access.ts`:

```ts
// src/store/access.ts
import { create } from "zustand";

export interface AccessState {
	routes: RouteObject[]
	isAccessChecked: boolean
	routeList: RouteObject[]
}

export interface AccessAction {
	setAccessStore: (routes: RouteObject[]) => void
	hasAccessByRoles: (roles?: string | string[]) => boolean
	hasAccessByCodes: (codes?: string | string[]) => boolean
}

export const useAccessStore = create<AccessState & AccessAction>(
	(set, get) => ({
		routes: [],
		isAccessChecked: false,
		routeList: [],

		setAccessStore: (routes) => {
			set({
				routes,
				isAccessChecked: true,
				routeList: routes
			});
		},

		hasAccessByRoles: (roles) => {
			// Kiểm tra quyền dựa trên vai trò
			// ...
		},

		hasAccessByCodes: (codes) => {
			// Kiểm tra quyền dựa trên mã quyền
			// ...
		}
	})
);
```

## Bảo vệ tuyến đường

Bạn có thể bảo vệ tuyến đường bằng cách thêm thuộc tính `roles` vào cấu hình tuyến đường:

```ts
// src/router/routes/modules/system.ts
export default {
  path: "/system",
  Component: ContainerLayout,
  handle: {
    title: "system.title",
    icon: <SettingOutlined />,
  },
  children: [
    {
      path: "user",
      Component: lazy(() => import("@/pages/system/user")),
      handle: {
        title: "system.user",
        roles: ["admin"], // Chỉ người dùng có vai trò 'admin' mới có thể truy cập
      },
    },
    // ...
  ],
};
```

## Kiểm soát quyền ở cấp độ thành phần

Bạn có thể kiểm soát quyền truy cập ở cấp độ thành phần bằng cách sử dụng thành phần `AccessControl`:

```tsx
import { AccessControl } from "@/components";

// Kiểm tra quyền dựa trên vai trò
<AccessControl type="role" codes="admin">
  <button>Chỉ admin có thể thấy</button>
</AccessControl>

// Kiểm tra quyền dựa trên mã quyền
<AccessControl codes="system:user:add">
  <button>Thêm người dùng</button>
</AccessControl>

// Hiển thị nội dung thay thế khi không có quyền
<AccessControl codes="system:user:delete" fallback={<span>Không có quyền xóa</span>}>
  <button>Xóa người dùng</button>
</AccessControl>
```

## Hook useAccess

Bạn cũng có thể sử dụng hook `useAccess` để kiểm tra quyền trong mã:

```tsx
import { useAccess } from "@/hooks";

function MyComponent() {
	const { hasAccessByRoles, hasAccessByCodes } = useAccess();

	const canAddUser = hasAccessByCodes("system:user:add");
	const isAdmin = hasAccessByRoles("admin");

	return (
		<div>
			{canAddUser && <button>Thêm người dùng</button>}
			{isAdmin && <button>Chức năng quản trị</button>}
		</div>
	);
}
```

## Quyền từ backend

Hệ thống hỗ trợ tải quyền từ backend. Khi người dùng đăng nhập, hệ thống sẽ gọi API để lấy thông tin quyền và vai trò của người dùng:

```ts
// src/router/guard/auth-guard.tsx
async function fetchUserInfoAndRoutes() {
	try {
		// Gọi API để lấy thông tin người dùng và quyền
		const userInfoResult = await getUserInfo();

		if (
			userInfoResult.status === "fulfilled" &&
			"roles" in userInfoResult.value
		) {
			// Cập nhật vai trò người dùng
			latestRoles.push(...(userInfoResult.value?.roles ?? []));
		}

		if (
			enableBackendAccess &&
			!isSendRoutingRequest &&
			userInfoResult.status === "fulfilled" &&
			"menus" in userInfoResult.value
		) {
			// Tạo tuyến đường từ dữ liệu backend
			routes.push(
				...(await generateRoutesFromBackend(userInfoResult.value?.menus ?? []))
			);
		}

		// ...
	}
	catch (error) {
		// Xử lý lỗi
	}
}
```

## Cấu hình quyền chi tiết

Bạn có thể cấu hình quyền chi tiết trong tệp cấu hình:

```ts
// src/config/access.config.ts
export const accessConfig = {
	// Vai trò mặc định cho người dùng mới
	defaultRoles: ["user"],

	// Quyền mặc định cho người dùng mới
	defaultCodes: ["dashboard:view"],

	// Vai trò có quyền cao nhất
	superRoles: ["admin"],

	// Quy tắc kiểm tra quyền
	rules: {
		// Quy tắc kiểm tra vai trò
		roles: (userRoles, requiredRoles) => {
			// Kiểm tra xem người dùng có vai trò cần thiết không
		},

		// Quy tắc kiểm tra mã quyền
		codes: (userCodes, requiredCodes) => {
			// Kiểm tra xem người dùng có mã quyền cần thiết không
		}
	}
};
```
