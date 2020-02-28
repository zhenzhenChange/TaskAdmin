<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>添加总代</span>
    </div>
    <el-form :model="agencyData" @submit.native.prevent="createAgency">
      <el-form-item>
        <el-input v-model="agencyData.phone" placeholder="请输入用户账号">
          <template slot="prepend">用户账号</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" v-model="agencyData.pwd" placeholder="请输入密码">
          <template slot="prepend">登录密码</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" v-model="confirmPwd" placeholder="请再次输入密码">
          <template slot="prepend">确认密码</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" icon="el-icon-plus">添加</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      confirmPwd: "",
      agencyData: { phone: "", pwd: "" },
    };
  },
  methods: {
    async createAgency() {
      if (this.agencyData.pwd !== this.confirmPwd) {
        this.$message.error({ message: "两次密码不一致~", offset: 10 });
        this.agencyData.pwd = this.confirmPwd = "";
        return;
      }
      const randomNum = Math.random()
        .toString()
        .slice(-6);
      this.agencyData.fake_id = randomNum;
      const { data } = await this.$http.post(`/admin/addRelesUser`, this.agencyData);
      this.$message.success({ message: data.status, offset: 10 });
      this.agencyData.phone = this.agencyData.pwd = this.confirmPwd = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.box-card {
  width: 30%;
  margin: 0 auto;
}
</style>
