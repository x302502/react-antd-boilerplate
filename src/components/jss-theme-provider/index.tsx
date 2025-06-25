import type { ReactNode } from "react";

import { usePreferences } from "~/hooks";

import { ConfigProvider, theme } from "antd";
import { useContext } from "react";
import { ThemeProvider } from "react-jss";

/**
 * Custom JSS theme provider component
 *
 * @zh Custom JSS theme provider component, used to provide JSS themes in React applications
 * @en Custom JSS theme provider component, used to provide JSS themes in React applications
 */
export interface JSSThemeProviderProps {
	/**
	 * Children components
	 *
	 * @zh Children components that will receive the JSS theme
	 * @en Children components that will receive the JSS theme
	 */
	children: ReactNode;
}

const { useToken } = theme;

/**
 * JSSThemeProvider component
 *
 * @zh JSSThemeProvider component, used to pass Ant Design tokens and global theme state to child components
 * @en JSSThemeProvider component, used to pass Ant Design tokens and global theme state to child components
 *
 * @param {JSSThemeProviderProps} props Component properties
 * @returns {JSX.Element} Returned JSX element
 */
export function JSSThemeProvider({ children }: JSSThemeProviderProps) {
	const antdContext = useContext(ConfigProvider.ConfigContext);
	const prefixCls = antdContext.getPrefixCls();
	const { token } = useToken();
	const { theme, isDark, isLight } = usePreferences();

	return (
		<ThemeProvider theme={{ token, theme, isDark, isLight, prefixCls }}>
			{children}
		</ThemeProvider>
	);
}
