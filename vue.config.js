module.exports = {
  devServer: {
    proxy: {
      "/task-api": {
        target: "http://47.111.180.163:8080/chStageV8",
        changeOrigin: true,
        pathRewrite: { "^/task-api": "/api" }
      }
    }
  },
  publicPath: "/task-admin/"
};
