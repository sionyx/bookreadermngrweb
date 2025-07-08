module.exports = { 
  //basePath: '/manage',
  //assetPrefix: '/manage/',
  basePath: '',
  assetPrefix: '',

  //https://github.com/vercel/next.js/issues/21079
  // images: {
  //   loader: "imgix",
  //   path: ""
  // },

  publicRuntimeConfig: {
    // process.env.NEXT_PUBLIC_API_URL
    API_URL: process.env.NODE_ENV === "production" ? 'https://20min.fun/api' : 'http://127.0.0.1:8080/api'
  },

}