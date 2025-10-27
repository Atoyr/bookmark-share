import { globalIgnores } from "eslint/config";
import pluginVue from "eslint-plugin-vue";
import jsonPlugin from "@eslint/json";
import cssPlugin from "@eslint/css";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";
import { config as baseConfig } from "./base.js";
import tseslint from "typescript-eslint";

/**
 * A custom ESLint configuration for libraries that use Nuxt.js.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const nuxtJsConfig = [
  ...baseConfig,
  eslintConfigPrettier,
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  pluginVue.configs["flat/essential"],
  {
    files: ["**/*.vue"],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
  jsonPlugin.configs.recommended,
  {
    files: ["**/*.json"],
    rules: {
      "no-irregular-whitespace": "off",
    },
  },
  cssPlugin.configs.recommended,
  { ignores: [".vscode/**", "app/components/ui"] },
  globalIgnores([".nuxt/**", "out/**", "build/**"]),
];
