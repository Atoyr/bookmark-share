// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default withNuxt([
  {
    rules: {
      'vue/no-multiple-template-root': 'off',
    },
  },
  eslintConfigPrettier,
  {
    // Your custom configs here
    ignores: ['.vscode/**', 'app/components/ui', 'eslint.config.mjs', 'prettier.config.ts'],
  },
]);
