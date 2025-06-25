## API Directory Introduction

> The api directory stores all request interface files, organized by pages. Each page corresponds to a directory. Directories can be nested, but files under directories need to include request interface files and type definition files.

Below is a typical directory structure [`src/api/user`](https://github.com/condorheroblog/react-antd-admin/tree/main/src/api/user):

```zsh
├── api
│   └── user                  # User page, API organized by page
│       ├── index.ts          # Request interface file
│       └── types.ts          # Type definition file
```

If there are pages under a page, you can continue nesting directories, for example: [`src/api/system`](https://github.com/condorheroblog/react-antd-admin/tree/main/src/api/system).

## File Description

### Type Definition Files

Type variable names generally start with the corresponding page name and end with `Type`, for example:

```ts
export interface RoleItemType {
	id: number;
	createTime: number;
	updateTime: number;
	name: string;
	code: string;
	status: 1 | 0;
	remark: string;
}
```

### Request Interface Files

A classic request interface file is shown below:

> Requests fully utilize HTTP methods, such as request.get, request.post, etc. Ignoring loading animations is implemented through the `ignoreLoading` parameter.

Special notes:

1. GET request parameters are placed in the `searchParams` object, while POST, PUT, and other request parameters are placed in the `json` object.
2. The request path cannot start with `/`.

```ts
import type { RoleItemType } from "./types";
import { request } from "~/utils";

export * from "./types";

/* Get role list */
export function fetchRoleList(data: any) {
	return request
		.get<
			ApiListResponse<RoleItemType>
		>("role-list", { searchParams: data, ignoreLoading: true })
		.json();
}

/* Add role */
export function fetchAddRoleItem(data: RoleItemType) {
	return request
		.post<ApiResponse<string>>("role-item", { json: data, ignoreLoading: true })
		.json();
}

/* Update role */
export function fetchUpdateRoleItem(data: RoleItemType) {
	return request
		.put<ApiResponse<string>>("role-item", { json: data, ignoreLoading: true })
		.json();
}

/* Delete role */
export function fetchDeleteRoleItem(id: number) {
	return request
		.delete<ApiResponse<string>>("role-item", { json: id, ignoreLoading: true })
		.json();
}
```

## `request.ts` Introduction

`request.ts` is a request library that encapsulates `[Ky](https://github.com/sindresorhus/ky)`. For code implementation, please see `[src/utils/request](https://github.com/condorheroblog/react-antd-admin/tree/main/src/utils/request)`.
