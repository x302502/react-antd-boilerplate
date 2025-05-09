# Bắt đầu nhanh {#quick-start}

## Chuẩn bị

::: info Yêu cầu môi trường

Trước khi bắt đầu dự án, bạn cần đảm bảo môi trường của bạn đáp ứng các yêu cầu sau:

- [Node.js](https://nodejs.org/en) phiên bản lớn hơn 18.18.0, khuyến nghị sử dụng [fnm](https://github.com/Schniz/fnm), [nvm](https://github.com/nvm-sh/nvm) để quản lý phiên bản.
- [Git](https://git-scm.com/) bất kỳ phiên bản nào.

Xác minh môi trường có đáp ứng các yêu cầu trên không bằng cách kiểm tra phiên bản qua các lệnh sau:

```bash
# Kiểm tra phiên bản node
node -v
# Kiểm tra phiên bản git
git -v
```

:::

## Tạo dự án

### Lấy mã nguồn

> Nhấp vào đây để tạo dự án mẫu trực tiếp: [Tạo kho lưu trữ từ mẫu này](https://github.com/new?template_name=react-antd-admin&template_owner=condorheroblog)

Cách lấy mã nguồn thủ công như sau:

::: code-group

```sh [GitHub]
npx degit condorheroblog/react-antd-admin react-antd-admin
# hoặc npx giget@latest gh:condorheroblog/react-antd-admin react-antd-admin
```

:::

### Cài đặt các phụ thuộc

Mở terminal trong thư mục mã nguồn của bạn và thực hiện các lệnh sau:

```bash
# Vào thư mục dự án
cd react-antd-admin

# Sử dụng phiên bản pnpm được chỉ định trong dự án để cài đặt phụ thuộc
corepack enable

# Cài đặt phụ thuộc
pnpm install
```

::: tip Lưu ý

- Dự án sử dụng `pnpm` để cài đặt phụ thuộc, mặc định sẽ sử dụng `corepack` để cài đặt phiên bản `pnpm` được chỉ định.
- Nếu corepack không thể truy cập nguồn npm, bạn có thể đặt biến môi trường hệ thống thành nguồn mirror `COREPACK_REGISTRY=https://registry.npmmirror.com`, sau đó thực hiện `pnpm install`.
- Nếu bạn không muốn sử dụng `corepack`, chỉ cần chạy `corepack disable` để vô hiệu hóa nó, sau đó sử dụng bất kỳ phiên bản `pnpm` nào để cài đặt.

:::

### Phát triển

Chỉ cần thực hiện lệnh sau để xem trang web tại `http://localhost:3333`:

```bash
pnpm run dev
```

### Xây dựng

Để xây dựng ứng dụng, chỉ cần thực hiện lệnh sau:

```bash
pnpm build
```

Sau đó bạn sẽ thấy thư mục build được tạo ra để phát hành.

### Xem trước

Để xem trước ứng dụng đã được xây dựng, thực hiện lệnh sau:

```bash
pnpm preview
```
