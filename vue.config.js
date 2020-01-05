module.exports = {
  devServer: {
    proxy: {
      '/api/admin': {
        target: "http://192.168.1.108:8080/chStage",
        changeOrigin: true
      },
      '/api/common': {
        target: "http://192.168.1.108:8080/chStage",
        changeOrigin: true
      }
    }
  }
}