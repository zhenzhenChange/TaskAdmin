module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: "http://47.99.213.197:8080/chStage",
        changeOrigin: true
      }
    }
  }
}