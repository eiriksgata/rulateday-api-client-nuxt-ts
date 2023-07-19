import { createVuetify } from "vuetify";
import "vuetify/styles";
import * as components from "vuetify/components";
import "@mdi/font/css/materialdesignicons.css";
import "typeface-roboto/index.css";
import { aliases, mdi } from 'vuetify/iconsets/mdi'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    icons: {
      defaultSet: "mdi",
      aliases,
      sets: {
        mdi,
      }
    }
  });
  nuxtApp.vueApp.use(vuetify);
});
