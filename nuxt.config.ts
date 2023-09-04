// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: [
    '~/assets/css/main.css',
    // 'quasar/fonts',
    // 'quasar/animations',
    // 'quasar/icons',
    // 'quasar/css',
    // 'quasar/brand' // If config.brand is used
  ],
  modules: [
    'nuxt-quasar-ui'
  ],
  quasar: {
    extras: {
      fontIcons: ['material-icons']
    },
    plugins: ['Notify'],
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})

