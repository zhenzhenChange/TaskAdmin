<template>
  <div>下单</div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  }
  /*  methods: {
    async fetchItems() {
      const res = await this.$http.get("rest/items");
      this.items = res.data;
    },
    editItem(itemId) {
      this.$router.push(`/items/edit/${itemId}`);
    },
    async removeItem(item) {
      this.$confirm(`是否确定要删除物品 "${item.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`rest/items/${item._id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.fetchItems();
        })
        .catch(() => {});
    }
  },
  created() {
    this.fetchItems();
  } */
};
</script>