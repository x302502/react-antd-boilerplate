import antfu from "@antfu/eslint-config";

export default antfu({
	react: true,
	markdown: false,
	ignorePatterns: ["*.md", "*.mdx", "docs/**/*", "**/docs/**/*", "**/*.md"],
	rules: {
		// Style rules
		"style/quotes": ["error", "double"],
		"style/semi": "off",
		"jsonc/indent": ["error", "tab"],
		"style/no-tabs": "off",
		"style/arrow-parens": "off",
		"style/jsx-indent-props": ["error", "tab"],
		"style/comma-dangle": "off",
		"style/multiline-ternary": "off",
		"style/no-mixed-spaces-and-tabs": "off",
		"style/operator-linebreak": "off",
		"style/quote-props": "off",
		"style/brace-style": "off",
		"style/jsx-curly-newline": "off",
		"antfu/consistent-list-newline": "off",
		"style/indent": "off",
		"style/member-delimiter-style": "off",
		"perfectionist/sort-imports": "off",
		"import/no-mutable-exports": "off",

		// React hooks rules
		"react-hooks/exhaustive-deps": "warn",
		"react-hooks-extra/no-direct-set-state-in-use-effect": "off",
		"react-hooks-extra/prefer-use-state-lazy-initialization": "off",

		// JSDoc rules
		"jsdoc/require-returns-check": "off",
		"jsdoc/check-param-names": "off",

		// React DOM rules
		"react-dom/no-missing-button-type": "off",
		"react-dom/no-missing-iframe-sandbox": "off",

		// React rules
		"react/no-clone-element": "off",
		"react-refresh/only-export-components": "off"
	}
});
