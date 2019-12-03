<template>
  <div>资金流水</div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      Article: {},
      categories: []
    };
  }
  /* methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`rest/articles/${this.id}`, this.Article);
      } else {
        await this.$http.post("rest/articles", this.Article);
      }
      this.$router.push("/articles/list");
      this.$message({
        type: String,
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`);
      this.Article = res.data;
    },
    async fetchArticles() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    },
    async addImage(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);

      resetUploader();
    }
  },
  created() {
    this.fetchArticles();
    this.id && this.fetch();
  } */
};
</script>