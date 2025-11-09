import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],
  runtimeConfig: {
    public: {
      SUPABASE_URL: process.env.PUBLIC_SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.PUBLIC_SUPABASE_ANON_KEY,
    },
  },
  supabase: {
    url: process.env.PUBLIC_SUPABASE_URL,
    key: process.env.PUBLIC_SUPABASE_ANON_KEY,
    redirectOptions: {
      login: '/login',
      callback: '/auth/callback',
      exclude: ['/', '/bookmarks'],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ['shadcn-nuxt', '@nuxt/test-utils/module', '@nuxtjs/supabase'],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: 'Shad',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './app/components/ui',
  },
  nitro: {
    ignore: ['**/*.test.*', '**/*.spec.*', '**/__tests__/**', '**/__mocks__/**'],
    alias: {
      cookie: 'cookie-es', // サーバー（Nitro）側
    },
  },
});

