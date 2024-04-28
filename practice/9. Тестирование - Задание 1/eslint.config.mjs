import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
      },
    },
    rules: {
      'no-var': 'error',
      'prettier/prettier': 'error',
    },
  },
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended,
];
