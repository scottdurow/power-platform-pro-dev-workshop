import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import prettierPlugin from 'eslint-plugin-prettier/recommended';

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs,ts}"], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
  prettierPlugin,
  {
    linterOptions: {
      reportUnusedDisableDirectives: false,
    },
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          useTabs: false,
          tabWidth: 2,
          semi: true,
          bracketSpacing: true,
          endOfLine: 'auto',
        },
      ],
    },
  },
]);