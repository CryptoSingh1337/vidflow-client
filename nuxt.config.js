import colors from "vuetify/es5/util/colors";

export default {
  target: "static",
  head: {
    title: "VidFlow",
    generate: {
      fallback: true
    },
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "VidFlow - An open source content sharing platform (similar to YouTube)"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/v.png" }]
  },
  css: [],
  plugins: [],
  components: true,
  buildModules: ["@nuxtjs/vuetify"],
  modules: ["@nuxtjs/axios"],
  axios: {},
  vuetify: {
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
          success: colors.green.accent3
        }
      }
    }
  },
  env: {
    baseUrl: process.env.BASE_URL || "http://localhost:3000"
  },
  build: {}
};
