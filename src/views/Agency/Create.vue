<template>
  <el-form label-width="120px" :model="agencyData">
    <el-form-item label="手机号码">
      <el-input v-model="agencyData.phone"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="agencyData.pwd"></el-input>
    </el-form-item>
    <el-form-item label="确认密码">
      <el-input v-model="pwd"></el-input>
    </el-form-item>
    <el-form-item label="支付宝姓名">
      <el-input v-model="agencyData.Alipay_name"></el-input>
    </el-form-item>
    <el-form-item label="支付宝账号">
      <el-input v-model="agencyData.Alipay_account"></el-input>
    </el-form-item>
    <el-form-item label="QQ">
      <el-input v-model="agencyData.qq_account"></el-input>
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="agencyData.user_remark"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button native-type="submit">生成</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      agencyData: {
        name: "",
        region: "",
        type: ""
      },
      pwd: ""
    };
  }
};
</script>