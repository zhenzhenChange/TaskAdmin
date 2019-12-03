<template>
  <div>总代中心</div>
</template>

<script>
export default {
  data() {
    return {
      admin_users: []
    };
  }
  /* methods: {
    async fetchAdminUsers() {
      const res = await this.$http.get("rest/admin_users");
      this.admin_users = res.data;
    },
    editAdminUser(id) {
      this.$router.push(`/admin_users/edit/${id}`);
    },
    async removeAdminUser(admin_user) {
      this.$confirm(`是否确定要删除管理员 "${admin_user.username}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`rest/admin_users/${admin_user._id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.fetchAdminUsers();
        })
        .catch(() => {});
    }
  },
  created() {
    this.fetchAdminUsers();
  } */
};
</script>