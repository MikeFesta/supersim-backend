import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  // 1. Setup base ESLint recommended rules
  js.configs.recommended,

  // 2. Setup TypeScript rules (replaces your 'plugin:@typescript-eslint/recommended')
  ...tseslint.configs.recommended,

  // 3. Define your custom overrides and settings
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    rules: {
      // Logic for modern TS 6 / ESLint 10 replacements
      '@typescript-eslint/no-require-imports': 'off', // Updated name for no-var-requires
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // 4. Disable conflict rules (MUST BE LAST)
  prettierConfig,
);
