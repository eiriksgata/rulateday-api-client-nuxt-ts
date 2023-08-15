// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: {
    transpile: ["vuetify"],
  },
  devtools: { enabled: true },
  typescript: {
    shim: false,
  },
  css: ["mdi/css/materialdesignicons.min.css"],
  modules: ["@vueuse/nuxt", "@pinia/nuxt"],
  imports: {
    dirs: ["./stores"],
  },
  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate'],
  },

});
