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
  components: [
    { path: '~/components', pathPrefix: false, extensions: ['vue'] },
    { path: '~/app/components', pathPrefix: true, extensions: ['vue'], ignore: ['**/ui/**'] },
  ],
  shadcn: {
    prefix: 'Shad',
    componentDir: './app/components/ui',
  },
});
