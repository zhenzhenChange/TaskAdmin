<template>
  <div>仪表盘</div>
</template>

<script>
export default {
  data() {
    return {
      categories: []
    };
  }
  /* methods: {
    async fetchCategories() {
      const res = await this.$http.get("rest/categories");
      this.categories = res.data;
    },
    editCategory(id) {
      this.$router.push(`/categories/edit/${id}`);
    },
    async removeCategory(category) {
      this.$confirm(`是否确定要删除分类 "${category.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`rest/categories/${category._id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.fetchCategories();
        })
        .catch(() => {});
    }
  },
  created() {
    this.fetchCategories();
  } */
};
</script>