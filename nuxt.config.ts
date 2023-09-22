// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: {
    transpile: ["vuetify"],
  },
  devtools: { enabled: true },
  nitro: {
    routeRules: {
      "/server/**": {
        static: false,
        cors: true,
        proxy: "http://localhost:16467/**",
      },
    },
  },

  // 该配置用于服务端请求转发

  typescript: {
    shim: false,
  },
  css: ["mdi/css/materialdesignicons.min.css"],
  modules: [
    "@vueuse/nuxt",
    [
      "@pinia/nuxt",
      {
        autoImports: [
          // 自动引入 `defineStore()`
          "defineStore",
          // 自动引入 `defineStore()` 并重命名为 `definePiniaStore()`
          ["defineStore", "definePiniaStore"],
        ],
      },
    ],
  ],
  imports: {
    dirs: ["./stores"],
  },
});
