import type { LanguageType } from "~/locales";
import type { PreferencesState, ThemeType } from "./types";

import { SIDE_NAVIGATION } from "~/layout/widgets/preferences/blocks/layout/constants";

import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Default preferences
 */
export const DEFAULT_PREFERENCES = {
	/* ================== General ================== */
	watermark: false,
	watermarkContent: "react-antd-admin",
	enableBackTopButton: true,
	pageLayout: "layout-right",
	enableBackendAccess: true,
	enableFrontendAceess: false,
	language: "vi-VN",
	enableDynamicTitle: true,
	enableCheckUpdates: true,
	checkUpdatesInterval: 1,

	/* ================== Theme ================== */
	theme: "auto",
	colorBlindMode: false,
	colorGrayMode: false,
	themeRadius: 6,
	builtinTheme: "blue",
	themeColorPrimary: "#1677ff",

	/* ================== Animation ================== */
	transitionProgress: true,
	transitionLoading: true,
	transitionEnable: true,
	transitionName: "fade-slide",

	/* ================== Layout ================== */
	navigationStyle: SIDE_NAVIGATION,

	/* ================== Tabbar ================== */
	tabbarEnable: true,
	tabbarShowIcon: true,
	tabbarPersist: true,
	tabbarDraggable: true,
	tabbarStyleType: "chrome",
	tabbarShowMore: true,
	tabbarShowMaximize: true,

	/* ================== Sidebar ================== */
	sidebarEnable: true,
	sidebarWidth: 210,
	sideCollapsedWidth: 56,
	sidebarCollapsed: false,
	sidebarCollapseShowTitle: true,
	sidebarExtraCollapsedWidth: 48,
	firstColumnWidthInTwoColumnNavigation: 80,
	sidebarTheme: "light",

	/* ================== Footer ================== */
	enableFooter: true,
	fixedFooter: true,
	companyName: "Condor Hero",
	companyWebsite: "http://github.com/condorheroblog/",
	copyrightDate: "2023",
	ICPNumber: "",
	ICPLink: ""
} satisfies PreferencesState;

/**
 * Preferences operation interface
 */
interface PreferencesAction {
	reset: () => void;
	changeSiteTheme: (theme: ThemeType) => void;
	changeLanguage: (language: LanguageType) => void;
	setPreferences: {
		// Single key-value update
		<T>(key: string, value: T): void;
		// Batch update in object form
		<T extends Partial<PreferencesState>>(preferences: T): void;
	};
}

/**
 * Preferences state management
 */
export const usePreferencesStore = create<
	PreferencesState & PreferencesAction
>()(
	persist(
		(set) => ({
			...DEFAULT_PREFERENCES,

			/**
			 * Update preferences
			 */
			setPreferences: (...args: any[]) => {
				if (args.length === 1) {
					const preferences = args[0];
					set(() => {
						return { ...preferences };
					});
				} else if (args.length === 2) {
					const [key, value] = args;
					set(() => {
						return { [key]: value };
					});
				}
			},

			/**
			 * Update theme
			 */
			changeSiteTheme: (theme) => {
				set(() => {
					return { theme };
				});
			},

			/**
			 * Update language
			 */
			changeLanguage: (language) => {
				set(() => {
					return { language };
				});
			},

			/**
			 * Reset state
			 */
			reset: () => {
				set(() => {
					return { ...DEFAULT_PREFERENCES };
				});
			}
		}),
		{ name: "preferences" }
	)
);
