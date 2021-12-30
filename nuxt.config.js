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
  buildModules: [
    "@nuxtjs/vuetify",
    "@nuxtjs/moment"
  ],
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/auth-next"
  ],
  axios: {
    baseURL: process.env.BACKEND_BASE_URL || "http://localhost:5000/api/v1/"
  },
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
  auth: {
    strategies: {
      local: {
        scheme: "refresh",
        localStorage: {
          prefix: "auth."
        },
        token: {
          prefix: "access_token.",
          property: "access_token",
          maxAge: 86400,
          type: "Bearer"
        },
        refresh_token: {
          prefix: "refresh_token.",
          property: "refresh_token",
          data: "refresh_token",
          maxAge: 129600
        },
        user: {
          property: "user",
          autoFetch: true,
        },
        endpoints: {
          login: { url: "/users/login", method: "post" },
          refresh: { url: "/user/token/refresh", method: "post" },
          user: { url: "/user", method: "get" },
          logout: false
        },
        autoLogout: false,
      }
    },
    redirect: {
      login: "/login",
      logout: "/",
      callback: "/login",
      home: "/"
    },
    cookie: false
  },
  router: {
    prefetchLinks: false,
  },
  env: {
    baseUrl: process.env.BASE_URL || "http://localhost:3000"
  },
  build: {}
};
