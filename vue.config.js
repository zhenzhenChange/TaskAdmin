module.exports = {
  devServer: {
    proxy: {
      "/api": {
        changeOrigin: true,
        target: "http://47.111.180.163:8080/chStageV8",
      },
    },
  },
  publicPath: "/task-admin/",
};
