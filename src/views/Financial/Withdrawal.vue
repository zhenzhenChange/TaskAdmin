<template>
  <div>提现处理</div>
</template>

<script>
export default {
  data() {
    return {
      articles: [],
      body: []
    };
  }
  /* methods: {
    async fetchArticles() {
      const res = await this.$http.get("rest/articles");
      this.articles = res.data;
    },
    editArticle(id) {
      this.$router.push(`/articles/edit/${id}`);
    },
    async removeArticle(article) {
      this.$confirm(`是否确定要删除文章 《 ${article.title} 》`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`rest/articles/${article._id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.fetchArticles();
        })
        .catch(() => {});
    }
  },
  created() {
    this.fetchArticles();
  } */
};
</script>
<style lang="scss" scoped></style>