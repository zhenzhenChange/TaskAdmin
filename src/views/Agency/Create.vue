<template>
  <el-form label-width="120px" :model="agencyData" @submit.native.prevent="createAgency">
    <el-row>
      <el-col :span="6">
        <el-form-item label="手机号码" required>
          <el-input v-model="agencyData.phone" placeholder="请输入手机号码"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="支付宝账号" required>
          <el-input v-model="agencyData.Alipay_account" placeholder="请输入支付宝账号（收款）"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="密码" required>
          <el-input type="password" v-model="agencyData.pwd" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="支付宝姓名" required>
          <el-input v-model="agencyData.Alipay_name" placeholder="请输入支付宝真实姓名"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="确认密码" required>
          <el-input type="password" v-model="confirmPwd" placeholder="请再次输入密码"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="QQ">
          <el-input v-model="agencyData.qq_account" placeholder="请输入QQ"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="备注">
          <el-input v-model="agencyData.user_remark" placeholder="推广码自动生成"></el-input>
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
        Alipay_account: "",
        pwd: "",
        Alipay_name: "",
        qq_account: "",
        user_remark: ""
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
      const res = await this.$commonHTTP.post(`/reg`, this.agencyData);
      if (JSON.parse(res.data.status)) {
        this.$message({
          type: "success",
          message: `${this.agencyData.phone}添加成功~`,
          offset: 10
        });
      } else {
        this.$message({
          type: "warning",
          message: `服务器超时，请稍后重试~~`,
          offset: 10
        });
      }
    }
  }
};
</script>