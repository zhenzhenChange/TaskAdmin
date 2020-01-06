<template>
  <el-form
    label-width="120px"
    :model="agencyData"
    @submit.native.prevent="createAgency"
  >
    <el-row>
      <el-col :span="6">
        <el-form-item label="手机号码" required>
          <el-input
            v-model="agencyData.phone"
            placeholder="请输入手机号码"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="密码" required>
          <el-input
            type="password"
            v-model="agencyData.pwd"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="确认密码" required>
          <el-input
            type="password"
            v-model="confirmPwd"
            placeholder="请再次输入密码"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item>
          <el-button native-type="submit">添加</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
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
