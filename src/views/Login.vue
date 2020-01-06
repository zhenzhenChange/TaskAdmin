<template>
  <el-card class="box-card">
    <div slot="header">
      <span>管理员登录</span>
    </div>
    <el-form @submit.native.prevent="login">
      <el-form-item label="用户名">
        <el-input v-model="userData.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="userData.pwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        phone: "",
        pwd: ""
      }
    };
  },
  methods: {
    async login() {
      const res = await this.$commonHTTP.post("/login", this.userData);
      const user = res.data.user;
      if (res.data.msg) {
        this.$message({
          type: "warning",
          message: `${res.data.msg}`,
          duration: 1500,
          center: true,
          offset: 10
        });
        return;
      }
      if (user.my_stratum !== 0) {
        this.$message({
          type: "warning",
          message: "请使用管理员账号登录～",
          duration: 1500,
          center: true,
          offset: 10
        });
        return;
      }
      if (user.is_valide === 0) {
        this.$message({
          type: "warning",
          message: "该账号已被封禁～",
          duration: 1500,
          center: true,
          offset: 10
        });
        return;
      }
      if (res.status === 200 && user.my_stratum === 0) {
        this.$store.commit("SaveUserID", user.uid);
        this.$store.commit("SaveUserSonPumpRation", user.son_pumpRation);
        this.$router.push("/members");
        this.$message({
          type: "success",
          message: "登录成功",
          duration: 1500,
          center: true,
          offset: 10
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.box-card {
  width: 30rem;
  margin: 10rem auto;
}
</style>
