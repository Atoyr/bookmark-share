import { defineConfig, configDefaults } from 'vitest/config';
import { defineVitestProject } from '@nuxt/test-utils/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          include: ['test/{e2e,unit}/*.{test,spec}.ts'],
          environment: 'node',
        },
      },
      await defineVitestProject({
        test: {
          name: 'api',
          include: ['server/**/*.{test,spec}.ts'],
          environment: 'nuxt',
        },
      }),
      await defineVitestProject({
        test: {
          name: 'nuxt',
          include: ['test/nuxt/*.{test,spec}.ts', 'app/components/**/*.{test,spec}.ts'],
          environment: 'nuxt',
        },
      }),
    ],
    coverage: {
      enabled: true,
      reporter: ['text', 'json', 'html'],
      exclude: [...configDefaults.exclude, 'nuxt.config.ts', 'app/components/ui/**', '**/*.mjs', '.nuxt/**'],
    },
  },
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./', import.meta.url)),
      '@': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
});
