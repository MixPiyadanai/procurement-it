import colors from "vuetify/es5/util/colors";
require("dotenv").config();

export default {
  server: {
    port: 3010,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s",
    title: "ระบบการจัดซื้อจัดจ้าง",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/main.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  moment: {
    locales: ["th"],
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "@nuxtjs/moment", "@nuxtjs/firebase"],

  axios: {
    // proxy: true
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        light: {
          primary: colors.blue.darken3,
          accent: colors.grey.darken3,
          secondary: colors.purple.base,
          info: colors.teal.lighten1,
          warning: colors.amber.darken4,
          error: colors.deepOrange.darken3,
          success: colors.green.base,
        },
      },
    },
  },

  serverMiddleware: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // firebase config
  firebase: {
    config: {
      apiKey: `${process.env.FIREBASE_apiKey}`,
      authDomain: `${process.env.FIREBASE_authDomain}`,
      projectId: `${process.env.FIREBASE_projectId}`,
      storageBucket: `${process.env.FIREBASE_storageBucket}`,
      messagingSenderId: `${process.env.FIREBASE_messagingSenderId}`,
      appId: `${process.env.FIREBASE_appId}`,
    },
    services: {
      storage: true,
    },
  },
};
