import type { ButtonProps, MenuProps } from "antd";

import { BasicButton } from "~/components";
import { UserCircleIcon } from "~/icons";
import { loginPath } from "~/router/extra-info";
import { useAuthStore, useUserStore } from "~/store";
import { cn, isWindowsOs } from "~/utils";

import { LogoutOutlined } from "@ant-design/icons";
import { useKeyPress } from "ahooks";
import { Avatar, Dropdown } from "antd";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export function UserMenu({ ...restProps }: ButtonProps) {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const avatar = useUserStore((state) => state.avatar);
	const logout = useAuthStore((state) => state.logout);

	const onClick: MenuProps["onClick"] = async ({ key }) => {
		if (key === "logout") {
			await logout();
			navigate(loginPath);
		}
		if (key === "personal-center") {
			navigate("/personal-center/my-profile");
		}
	};

	const altView = useMemo(() => (isWindowsOs() ? "Alt" : "⌥"), [isWindowsOs]);
	const items: MenuProps["items"] = [
		{
			label: t("common.menu.personalCenter"),
			key: "personal-center",
			icon: <UserCircleIcon />,
			extra: `${altView}P`
		},
		{
			label: t("authority.logout"),
			key: "logout",
			icon: <LogoutOutlined />,
			extra: `${altView}Q`
		}
	];

	useKeyPress(["alt.P"], () => {
		navigate("/personal-center/my-profile");
	});

	useKeyPress(["alt.Q"], () => {
		onClick({ key: "logout" } as any);
	});

	return (
		<Dropdown
			menu={{ items, onClick }}
			arrow={false}
			placement="bottomRight"
			trigger={["click"]}
		>
			<BasicButton
				type="text"
				{...restProps}
				className={cn(restProps.className, "rounded-full px-1")}
			>
				<Avatar src={avatar} />
			</BasicButton>
		</Dropdown>
	);
}
