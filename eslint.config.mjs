import { globalIgnores } from 'eslint/config';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import googleConfig from 'eslint-config-google';
import stylistic from '@stylistic/eslint-plugin';
import playwright from 'eslint-plugin-playwright';
import checkFile from 'eslint-plugin-check-file';

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  googleConfig,
  globalIgnores(['src/.schema/**']),
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    plugins: {
      '@stylistic': stylistic,
      playwright,
      'check-file': checkFile,
    },
    rules: {
      'valid-jsdoc': 'off', // deprecated,
      'require-jsdoc': 'off', // deprecated
      'object-curly-spacing': 'off', // deprecated
      'max-len': 'off', // deprecated
      'operator-linebreak': ['error', 'before'],
      'no-empty-pattern': 'off',
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/max-len': ['error', { 'code': 150, 'ignorePattern': '^import\\s.+\\sfrom\\s.+;$' }],
      '@stylistic/type-annotation-spacing': ['error', { 'before': false, 'after': true }],
      '@stylistic/space-infix-ops': ['error', { 'int32Hint': false }],
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
  // Playwright ESlint config
  {
    files: ['src/tests/**'],
    rules: {
      'playwright/no-focused-test': 'error',
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
      'node_modules',
      '.schema',
      'test-report',
      'test-results',
    ],
  },
];
