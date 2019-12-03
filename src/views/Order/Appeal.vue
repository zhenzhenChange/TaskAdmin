<template>
  <div class="list">申诉管理</div>
</template>

<script>
export default {
  data() {
    return {
      heroes: [],
      categories: [],
      withItems: [],
      againstItems: []
    };
  }
  /* methods: {
    async fetchHeroes() {
      const res = await this.$http.get("rest/heroes");
      this.heroes = res.data;
      // this.fetchItemsPositions();
    },
    editHero(id) {
      this.$router.push(`/heroes/edit/${id}`);
    },
    async removeHero(hero) {
      this.$confirm(`是否确定要删除分类 "${hero.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`rest/heroes/${hero._id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.fetchHeroes();
        })
        .catch(() => {});
    }
  },
  created() {
    this.fetchHeroes();
  } */
};
</script>