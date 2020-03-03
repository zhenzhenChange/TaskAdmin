<template>
  <el-card class="box-card">
    <div slot="header">
      <span>欢迎登录</span>
    </div>
    <el-form @submit.native.prevent="login">
      <el-form-item>
        <el-input clearable v-model="userData.phone" placeholder="请输入账号">
          <template slot="prepend">账号</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input show-password type="password" v-model="userData.pwd" placeholder="请输入密码">
          <template slot="prepend">密码</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-user-solid" type="primary" size="medium" native-type="submit">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      userData: { phone: "", pwd: "" },
    };
  },
  methods: {
    async login() {
      if (!this.userData.phone) {
        this.$message.warning({ message: `请输入账号`, duration: 1500, offset: 10 });
        return;
      }
      if (!this.userData.pwd) {
        this.$message.warning({ message: `请输入密码`, duration: 1500, offset: 10 });
        return;
      }
      const res = await this.$http.post("/common/login", this.userData);
      const user = res.data.user;
      if (res.data.msg) {
        this.$message.warning({ message: `${res.data.msg}`, duration: 1500, offset: 10 });
        return;
      }
      if (user.my_stratum !== 0) {
        this.$message.warning({ message: "您不是管理员～", duration: 1500, offset: 10 });
        return;
      }
      if (user.is_valide === 0) {
        this.$message.warning({ message: "该账号已被封禁～", duration: 1500, offset: 10 });
        return;
      }
      if (res.status === 200 && user.my_stratum === 0) {
        this.$store.commit("SaveUserID", user.uid);
        this.$store.commit("SaveUserSonPumpRation", user.son_pumpRation);
        this.$store.commit("SaveUserMyReturnRation", user.my_returnRatio);
        this.$store.commit("SaveKey", user.key);
        this.$router.push("/members");
        this.$message.success({ message: "登录成功", duration: 1500, offset: 10 });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.box-card {
  width: 25rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
