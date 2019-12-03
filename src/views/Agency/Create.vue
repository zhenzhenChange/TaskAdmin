<template>
  <div>添加总代</div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      AdminUser: {}
    };
  }
  /* methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`rest/admin_users/${this.id}`, this.AdminUser);
      } else {
        await this.$http.post("rest/admin_users", this.AdminUser);
      }
      this.$router.push("/admin_users/list");
      this.$message({
        type: String,
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/admin_users/${this.id}`);
      this.AdminUser = res.data;
    }
  },
  created() {
    this.id && this.fetch();
  } */
};
</script>