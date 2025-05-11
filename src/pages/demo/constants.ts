interface DemoItem {
	key: number;
	title: string;
	description: string;
	tag: string;
	color: string;
}

export const demoItems: DemoItem[] = [
	{
		key: 1,
		title: "Responsive Design",
		description:
			"Fully responsive layout that works on desktop, tablet, and mobile devices.",
		tag: "UI",
		color: "blue"
	},
	{
		key: 2,
		title: "Ant Design Components",
		description:
			"Leveraging the power of Ant Design to create beautiful and consistent user interfaces.",
		tag: "Components",
		color: "purple"
	},
	{
		key: 3,
		title: "React Hooks",
		description:
			"Using modern React patterns with hooks for state management and side effects.",
		tag: "React",
		color: "green"
	},
	{
		key: 4,
		title: "Internationalization",
		description: "Multi-language support with easy translation management.",
		tag: "i18n",
		color: "orange"
	},
	{
		key: 5,
		title: "Theme Customization",
		description: "Customizable themes with light and dark mode support.",
		tag: "Theming",
		color: "magenta"
	}
];
