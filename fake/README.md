## Fake Directory Introduction

Simulates backend data, mainly used for frontend development and debugging.

| File                   | Description                   |
|------------------------|------------------------|
| `utils.ts`             | API response utility functions       |
| `auth.fake.ts`         | Authentication APIs (login and logout, etc.) |
| `user.fake.ts`         | User information APIs           |
| `async-routes.fake.ts` | Dynamic routing APIs           |
| `constants.ts`         | Constant data             |
| ...                    | ...                    |

## Fake File Description

A classic fake file is shown below:

> Filename: `auth.fake.ts` - the middle infix (`.fake.`) is required.

```ts
import { defineFakeRoute } from "vite-plugin-fake-server/client";

import { resultSuccess } from "./utils";

export default defineFakeRoute([
	{
		url: "/logout",
		timeout: 1000,
		method: "post",
		response: () => resultSuccess({}),
	},
]);
```

## Recommendations for Using Fake in Projects

It is recommended to create one fake file per page, with the filename matching the page name.
