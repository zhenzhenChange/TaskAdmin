<template>
  <el-form label-width="80px" :model="customerData">
    <el-form-item label="充值账户">
      <el-input v-model="customerData.phone"></el-input>
    </el-form-item>
    <el-form-item label="交易金额">
      <el-input v-model="customerData.wb_fee"></el-input>
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="customerData.wb_remark"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button native-type="submit">确定</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      customerData: {
        phone: "",
        wb_fee: "",
        wb_remark: ""
      }
    };
  },
  methods: {
    postCustomerData() {
      // this.$http.post(`/api/admin/fee/${this.customerData}`);
    }
  }
};
</script>