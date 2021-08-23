module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    host: "localhost",
    disableHostCheck: true,
    port: 9000,
    https: false,
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:8080",
    //   },
    // },
  },
};
