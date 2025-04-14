import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import playwright from 'eslint-plugin-playwright';
import checkFile from 'eslint-plugin-check-file';

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylistic,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['eslint.config.mjs'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    plugins: {
      '@stylistic': stylistic,
      'check-file': checkFile,
    },
    rules: {
      'valid-jsdoc': 'off', // deprecated,
      'require-jsdoc': 'off', // deprecated
      'object-curly-spacing': 'off', // deprecated
      'max-len': 'off', // deprecated
      'operator-linebreak': ['error', 'before'],
      'no-empty-pattern': 'off',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/max-len': [
        'error',
        { code: 150, comments: 9999, ignoreStrings: true },
      ],
      '@stylistic/indent': ['error', 2],
      '@stylistic/spaced-comment': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/no-multi-spaces': ['error'],
      '@stylistic/type-annotation-spacing': [
        'error',
        { 'before': false, 'after': true },
      ],
      '@stylistic/space-infix-ops': [
        'error',
        { int32Hint: false },
      ],
      'no-undef': 'off',
      'no-unused-vars': 'error',
      'space-before-blocks': 'error',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
  // Playwright ESlint config
  {
    ...playwright.configs['flat/recommended'],
    files: ['src/tests/**'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'playwright/no-focused-test': 'error',
      'playwright/expect-expect': 'off',
    },
  },
  // Check file ESlint config
  {
    files: ['**/*'],
    rules: {
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*': '([a-z])*([a-z0-9])*([A-Z]*([a-z0-9]))*(\\.[a-z]+)', // camelCase + dot case for file names
        },
      ],
      'check-file/folder-naming-convention': ['error', { '**/*': 'CAMEL_CASE' }],
    },
  },
  {
    ignores: [
      'eslint.config.mjs',
      'node_modules',
      'playwright-report',
      'test-results',
      'blob-report',
      'html-report',
    ],
  },
];
