<template>
  <div>接单</div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      Item: {}
    };
  }
  /*  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`rest/items/${this.id}`, this.Item);
      } else {
        await this.$http.post("rest/items", this.Item);
      }
      this.$router.push("/items/list");
      this.$message({
        type: String,
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`);
      this.Item = res.data;
    },
    uploadSuccess(res) {
      // this.model.icon = res.url;
      // 显示赋值，icon属性事先未定义
      this.$set(this.Item, "icon", res.url);
    }
  },
  created() {
    this.id && this.fetch();
  } */
};
</script>