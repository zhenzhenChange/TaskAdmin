<template>
  <div>下单端设置</div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      Ad: {
        ads: []
      }
    };
  }
  /* methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`rest/ads/${this.id}`, this.Ad);
      } else {
        await this.$http.post("rest/ads", this.Ad);
      }
      this.$router.push("/ads/list");
      this.$message({
        type: String,
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}`);
      this.Ad = res.data;
    }
  },
  created() {
    this.id && this.fetch();
  } */
};
</script>