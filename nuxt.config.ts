import eslint from 'vite-plugin-eslint2'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@pinia/nuxt',
  ],

  eslint: {
    // options here
    checker: true, // for ESLint checking when runing dev server, using `vite-plugin-eslint2` (NOT on the build time!)
  },

  vite: {
    plugins: [eslint({ include: ['**/*.{ts,vue}'], exclude: ['node_modules', '.nuxt'] })],

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/variables.scss" as *;',
          // silenceDeprecations: ['mixed-decls', 'color-functions', 'global-builtin', 'import'],
        },
      },
    },

    esbuild: {
      drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [], // suppress console logs on production
    },
  },

  typescript: {
    /*
    Nuxt’s built-in type checking slows down hot-reload a bit
    A faster pattern is:
    
    Dev mode: Run Nuxt with typeCheck: false (no blocking on reloads). - in defineNuxtConfig: typeCheck: process.env.NODE_ENV === 'production'

    Parallel type check: Run "vue-tsc --noEmit --skipLibCheck --watch" (script: "typecheck-watch") in another terminal.
     */

    typeCheck: process.env.NODE_ENV === 'production', // check types only on build time
    // typeCheck: true, // type-checking at build or development time
  },

  css: ['@/assets/scss/main.scss'],
})
