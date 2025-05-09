import type { DefaultTheme } from "vitepress";
import { defineConfig } from "vitepress";

export const vi = defineConfig({
	lang: "vi-VN",
	description: "React Antd Admin | Khung hệ thống quản lý doanh nghiệp",

	themeConfig: {
		nav: nav(),

		sidebar: {
			"/vi/guide/": { base: "/vi/guide/", items: sidebarGuide() },
		},

		editLink: {
			pattern: "https://github.com/condorheroblog/react-antd-admin/edit/main/docs/:path",
			text: "Chỉnh sửa trang này trên GitHub",
		},

		footer: {
			message: "Phát hành theo giấy phép MIT",
			copyright: `Bản quyền © 2023-${new Date().getFullYear()} CondorHero`,
		},

		docFooter: {
			prev: "Trang trước",
			next: "Trang sau",
		},

		outline: {
			label: "Điều hướng trang",
		},

		lastUpdated: {
			text: "Cập nhật lần cuối",
			formatOptions: {
				dateStyle: "short",
				timeStyle: "medium",
			},
		},

		langMenuLabel: "Đa ngôn ngữ",
		returnToTopLabel: "Trở lại đầu trang",
		sidebarMenuLabel: "Menu",
		darkModeSwitchLabel: "Giao diện",
		lightModeSwitchTitle: "Chuyển sang chế độ sáng",
		darkModeSwitchTitle: "Chuyển sang chế độ tối",
	},
});

function nav(): DefaultTheme.NavItem[] {
	return [
		{
			text: "Hướng dẫn",
			link: "/vi/guide/what-is-react-antd-admin",
			activeMatch: "/vi/guide/",
		},
		{
			text: "Tài trợ",
			link: "/vi/sponsor/",
		},
	];
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
	return [
		{
			text: "Giới thiệu",
			collapsed: false,
			items: [
				{
					text: "React Antd Admin là gì?",
					link: "/vi/guide/what-is-react-antd-admin",
				},
				{ text: "Bắt đầu", link: "/vi/guide/getting-started" },
			],
		},
		{
			text: "Cơ bản",
			collapsed: false,
			items: [
				{ text: "Cấu trúc thư mục", link: "/vi/guide/directory-structure" },
				{ text: "Cấu hình", link: "/vi/guide/configuration" },
				{ text: "Định tuyến", link: "/vi/guide/routing" },
				{ text: "Quản lý trạng thái", link: "/vi/guide/state-management" },
				{ text: "Quốc tế hóa", link: "/vi/guide/i18n" },
				{ text: "Giao diện", link: "/vi/guide/theme" },
				{ text: "Kiểm soát truy cập", link: "/vi/guide/access-control" },
				{ text: "Xác thực", link: "/vi/guide/authentication" },
				{ text: "Yêu cầu HTTP", link: "/vi/guide/http-request" },
				{ text: "Mô-đun", link: "/vi/guide/modules" },
			],
		},
		{
			text: "Nâng cao",
			collapsed: false,
			items: [
				{ text: "Tùy chỉnh", link: "/vi/guide/customization" },
				{ text: "Triển khai", link: "/vi/guide/deployment" },
			],
		},
	];
}

export const search: DefaultTheme.AlgoliaSearchOptions["locales"] = {
	vi: {
		placeholder: "Tìm kiếm tài liệu",
		translations: {
			button: {
				buttonText: "Tìm kiếm",
				buttonAriaLabel: "Tìm kiếm",
			},
			modal: {
				searchBox: {
					resetButtonTitle: "Xóa truy vấn tìm kiếm",
					resetButtonAriaLabel: "Xóa truy vấn tìm kiếm",
					cancelButtonText: "Hủy",
					cancelButtonAriaLabel: "Hủy",
				},
				startScreen: {
					recentSearchesTitle: "Tìm kiếm gần đây",
					noRecentSearchesText: "Không có tìm kiếm gần đây",
					saveRecentSearchButtonTitle: "Lưu tìm kiếm này",
					removeRecentSearchButtonTitle: "Xóa tìm kiếm này khỏi lịch sử",
					favoriteSearchesTitle: "Yêu thích",
					removeFavoriteSearchButtonTitle: "Xóa tìm kiếm này khỏi mục yêu thích",
				},
				errorScreen: {
					titleText: "Không thể lấy kết quả",
					helpText: "Bạn có thể muốn kiểm tra kết nối mạng của mình.",
				},
				footer: {
					selectText: "để chọn",
					navigateText: "để điều hướng",
					closeText: "để đóng",
					searchByText: "Tìm kiếm bởi",
				},
				noResultsScreen: {
					noResultsText: "Không tìm thấy kết quả cho",
					suggestedQueryText: "Bạn có thể thử tìm kiếm",
					reportMissingResultsText: "Tin rằng truy vấn này nên trả về kết quả?",
					reportMissingResultsLinkText: "Hãy cho chúng tôi biết.",
				},
			},
		},
	},
};
