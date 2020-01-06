<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>添加总代</span>
    </div>
    <el-form :model="agencyData" @submit.native.prevent="createAgency">
      <el-form-item>
        <el-input v-model="agencyData.phone" placeholder="请输入手机号码">
          <template slot="prepend">手机号码</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          type="password"
          v-model="agencyData.pwd"
          placeholder="请输入密码"
          ><template slot="prepend">登录密码</template></el-input
        >
      </el-form-item>
      <el-form-item>
        <el-input
          type="password"
          v-model="confirmPwd"
          placeholder="请再次输入密码"
          ><template slot="prepend">确认密码</template></el-input
        >
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" icon="el-icon-plus"
          >添加</el-button
        >
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      agencyData: {
        phone: "",
        pwd: ""
      },
      confirmPwd: ""
    };
  },
  methods: {
    async createAgency() {
      if (this.agencyData.pwd !== this.confirmPwd) {
        this.$message({
          type: "error",
          message: "两次密码不一致~",
          offset: 10
        });
        this.agencyData.pwd = this.confirmPwd = "";
        return;
      }
      const res = await this.$http.post(`/addRelesUser`, this.agencyData);
      console.log(res);
      if (res.data.status) {
        this.$message({
          type: "success",
          message: `${res.data.status}`,
          offset: 10
        });
        this.agencyData.phone = this.agencyData.pwd = this.confirmPwd = "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.box-card {
  width: 30%;
  margin: 0 auto;
}
</style>
