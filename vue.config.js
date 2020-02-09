module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://47.111.180.163:8080/chStageV8",
        changeOrigin: true
      }
    }
  },
  publicPath: "/task-admin/"
};
