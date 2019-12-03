<template>
  <div>接单端设置</div>
</template>

<script>
export default {
  data() {
    return {
      ads: []
    };
  }
  /* methods: {
    async fetchAds() {
      const res = await this.$http.get("rest/ads");
      this.ads = res.data;
    },
    editAd(id) {
      this.$router.push(`/ads/edit/${id}`);
    },
    async removeAd(ad) {
      this.$confirm(`是否确定要删除分类 "${ad.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`rest/ads/${ad._id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.fetchAds();
        })
        .catch(() => {});
    }
  },
  created() {
    this.fetchAds();
  } */
};
</script>