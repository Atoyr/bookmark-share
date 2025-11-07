import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],

  vite: {
    plugins: [tailwindcss()],
  },
  modules: ['shadcn-nuxt', '@nuxt/test-utils/module'],
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
  supabase: {
    // SSRでのCookie管理や自動リダイレクトを自前で制御したい場合
    redirect: false,
  },
});
