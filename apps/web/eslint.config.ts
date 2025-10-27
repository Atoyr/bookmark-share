// @ts-check
import { nuxtJsConfig } from "@repo/eslint-config/nuxt-js";
import { defineConfig } from 'eslint/config';

export default defineConfig([
  ...nuxtJsConfig,
  {
    ignores: [".output", ".turbo", ".nuxt"],
  },
]);

