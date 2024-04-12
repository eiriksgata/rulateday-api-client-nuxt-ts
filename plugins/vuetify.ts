import { createVuetify } from "vuetify";
import "vuetify/styles";
import * as components from "vuetify/components";
import "@mdi/font/css/materialdesignicons.css";
import "typeface-roboto/index.css";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import DateFnsAdapter from '@date-io/date-fns'
import enUS from 'date-fns/locale/zh-CN'
import svSE from 'date-fns/locale/sv'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    icons: {
      defaultSet: "mdi",
      aliases,
      sets: {
        mdi,
      },
    },
    date: {
      adapter: DateFnsAdapter,
      locale: {
        en: enUS,
        sv: svSE,
      },
    },
  });
  
  nuxtApp.vueApp.use(vuetify);
});
