import antfu from '@antfu/eslint-config';

export default antfu({
  react: true,
  markdown: false,
  ignorePatterns: ['*.md', '*.mdx', 'docs/**/*', '**/docs/**/*', '**/*.md'],
  type: 'lib',
  stylistic: {
    indent: 2,
  },
  yaml: false,
  rules: {
    // Style rules
    'style/quotes': 'off',
    'style/semi': 'off',
    'jsonc/indent': 'off',
    'style/no-tabs': 'off',
    'style/arrow-parens': 'off',
    'style/jsx-indent-props': 'off',
    'style/comma-dangle': 'off',
    'style/multiline-ternary': 'off',
    'style/no-mixed-spaces-and-tabs': 'off',
    'style/operator-linebreak': 'off',
    'style/quote-props': 'off',
    'style/brace-style': 'off',
    'style/jsx-curly-newline': 'off',
    'antfu/consistent-list-newline': 'off',
    'antfu/if-newline': 'off',
    'style/indent': 'off',
    'style/member-delimiter-style': 'off',
    'perfectionist/sort-imports': 'off',
    'import/no-mutable-exports': 'off',
    'style/jsx-wrap-multilines': 'off',
    'style/indent-binary-ops': 'off',
    'no-console': 'warn',
    'unused-imports/no-unused-vars': 'warn',
    'perfectionist/sort-named-imports': 'off',

    // typescript rules
    '@typescript-eslint/consistent-type-imports': 'off',
    'ts/explicit-function-return-type': 'off',
    // antfu rules
    'antfu/top-level-function': 'off',

    // React hooks rules
    'react-hooks-extra/no-direct-set-state-in-use-effect': 'off',
    'react-hooks-extra/prefer-use-state-lazy-initialization': 'off',

    // JSDoc rules
    'jsdoc/require-returns-check': 'off',
    'jsdoc/check-param-names': 'off',

    // React DOM rules
    'react-dom/no-missing-button-type': 'off',
    'react-dom/no-missing-iframe-sandbox': 'off',

    // React rules
    'react/no-clone-element': 'off',
    'react-refresh/only-export-components': 'off',
  },
});
