// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', 'shadcn-nuxt'],
  css: ['~/assets/css/tailwind.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  shadcn: {
    prefix: 'sh-',
    componentDir: './app/components/ui',
  },
  components: [
    { path: '~/components', ignore: ['~/components/ui'] },
    { path: '~/components/ui', pathPrefix: false },
  ],
});
