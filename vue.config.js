module.exports = {
  devServer: {
    proxy: {
      "/api/admin": {
        target: "http://47.99.213.197:8080/chStageV7",
        changeOrigin: true
      },
      "/api/common": {
        target: "http://47.99.213.197:8080/chStageV7",
        changeOrigin: true
      }
    }
  },
  publicPath: "/task-admin/"
};
