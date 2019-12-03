<template>
  <div>订单记录</div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      Hero: {
        name: "",
        via: "",
        scores: {
          difficult: 0
        },
        skills: [],
        partnerShip: []
      },
      categories: [],
      items: [],
      heroes: []
    };
  }
  /* methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`rest/heroes/${this.id}`, this.Hero);
      } else {
        await this.$http.post("rest/heroes", this.Hero);
      }
      this.$router.push("/heroes/list");
      this.$message({
        type: String,
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/heroes/${this.id}`);
      // 难点
      this.Hero = Object.assign({}, this.Hero, res.data);
    },
    uploadViaSuccess(res) {
      this.Hero.via = res.url;
      // 显示赋值，icon属性事先未定义
      // this.$set(this.Hero, "via", res.url);
    },
    uploadBannerSuccess(res) {
      this.$set(this.Hero, "banner", res.url);
    },
    async fetchPosition() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    },
    async fetchItems() {
      const res = await this.$http.get(`rest/items`);
      this.items = res.data;
    },
    async fetchHeroes() {
      const res = await this.$http.get(`rest/heroes`);
      this.heroes = res.data;
    }
  },
  created() {
    this.fetchItems();
    this.fetchHeroes();
    this.fetchPosition();
    this.id && this.fetch();
  } */
};
</script>
<style scoped>
.scores-rate {
  margin-top: 0.64rem;
}

.el-col.el-col-24.el-col-md-12 {
  border-bottom: 0.1rem #bfc1c4 dotted;
}

.checkItem {
  width: 100%;
}

.w-100 >>> .el-input__inner {
  width: 10rem;
}

.banner >>> .el-upload {
  max-width: 20rem;
}
</style>