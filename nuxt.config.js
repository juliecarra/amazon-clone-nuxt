const URL = "http://localhost:8080";

export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: "amazon-clone" || process.env.npm_package_name,
    script: [{ src: "https://js.stripe.com/v3/" }],
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/img/logo.png" },
      { rel: "stylesheet", href: "/css/font-awesome/css/all.css" },
      { rel: "stylesheet", href: "/css/default.css" }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: "~/plugins/localStorage.js", ssr: false }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    "bootstrap-vue/nuxt",
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    "@nuxtjs/auth"
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
    baseURL:
      process.env.NODE_ENV === "production"
        ? "https://amazon-clone-vuejs.herokuapp.com"
        : URL
  },

  // "@nuxtjs/auth" configuration
  proxy: {
    "/api": URL
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            propertyName: "token"
          },
          user: { url: "/api/auth/user", propertyName: false },
          logout: { url: "/api/auth/logout" }
        }
      }
    }
  }
};
