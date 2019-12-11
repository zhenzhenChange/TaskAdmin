<template>
  <el-form label-width="120px" :model="customerData" @submit.native.prevent="postCustomerData">
    <el-row>
      <el-col :span="6">
        <el-form-item label="充值账号" required>
          <el-input v-model="customerData.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="支付宝账号" required>
          <el-input v-model="customerData.Alipay_account" placeholder="请输入支付宝账号"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="支付宝姓名" required>
          <el-input v-model="customerData.Alipay_name" placeholder="请输入支付宝姓名"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="充值金额" required>
          <el-input v-model="customerData.wb_fee" placeholder="请输入充值金额"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="备注">
          <el-input v-model="customerData.wb_remark" placeholder="请输入备注（可选）"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item>
          <el-button native-type="submit">充值</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      customerData: {
        phone: "",
        Alipay_account: "",
        Alipay_name: "",
        wb_fee: "",
        wb_remark: ""
      }
    };
  },
  methods: {
    async postCustomerData() {
      const res = this.$http.post(`/recharge/${this.customerData}`);
      if (res.statusCode) {
        this.$message({
          type: "success",
          message: "充值成功！",
          offset: 10
        });
      }
    }
  }
};
</script>