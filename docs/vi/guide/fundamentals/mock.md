# Dữ liệu giả lập {#mock-data}

Trong quá trình phát triển, chúng ta thường cần dữ liệu giả lập để thử nghiệm giao diện người dùng mà không cần phụ thuộc vào API thực. Dự án này sử dụng `vite-plugin-fake-server` để tạo dữ liệu giả lập.

## Cấu hình

Dữ liệu giả lập được cấu hình trong thư mục `fake`. Mỗi tệp trong thư mục này đại diện cho một nhóm API giả lập.

```bash
fake
├── async-routes.fake.ts               # Tuyến đường bất đồng bộ
├── auth.fake.ts                       # Đăng nhập và đăng xuất
├── user.fake.ts                       # Thông tin người dùng
└── ...
```

## Tạo API giả lập

Để tạo một API giả lập, bạn cần tạo một tệp trong thư mục `fake` với định dạng sau:

```ts
// fake/example.fake.ts
import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
	{
		url: "/api/example",
		method: "GET",
		response: () => {
			return {
				code: 200,
				data: {
					message: "Đây là dữ liệu giả lập"
				}
			};
		}
	}
]);
```

## Sử dụng API giả lập

Sau khi định nghĩa API giả lập, bạn có thể sử dụng nó trong ứng dụng của mình như một API thông thường:

```ts
import { request } from "@/utils/request";

// Gọi API giả lập
async function fetchData() {
	const response = await request.get("/api/example");
	console.log(response.data);
}
```

## Mô phỏng độ trễ

Bạn có thể mô phỏng độ trễ mạng bằng cách thêm tùy chọn `timeout` vào phản hồi:

```ts
{
  url: "/api/example",
  method: "GET",
  response: () => {
    return {
      code: 200,
      data: {
        message: "Đây là dữ liệu giả lập với độ trễ"
      },
      timeout: 1000 // Độ trễ 1 giây
    };
  }
}
```

## Vô hiệu hóa dữ liệu giả lập trong môi trường sản xuất

Dữ liệu giả lập chỉ được sử dụng trong môi trường phát triển. Trong môi trường sản xuất, bạn nên sử dụng API thực. Để vô hiệu hóa dữ liệu giả lập trong môi trường sản xuất, hãy đảm bảo rằng biến môi trường `VITE_USE_MOCK` được đặt thành `false` trong tệp `.env.production`.
