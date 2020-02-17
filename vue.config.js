module.exports = {
  devServer: {
    proxy: {
      "/api": {
        changeOrigin: true,
        target: "http://47.99.213.197:8080/chStageV8",
      },
    },
  },
  publicPath: "/task-admin/",
};
