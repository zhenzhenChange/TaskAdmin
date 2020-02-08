module.exports = {
  devServer: {
    proxy: {
      "/api/admin": {
        target: "http://47.111.180.163:8080/chStageV8",
        changeOrigin: true
      },
      "/api/common": {
        target: "http://47.111.180.163:8080/chStageV8",
        changeOrigin: true
      }
    }
  },
  publicPath: "/task-admin/"
};
