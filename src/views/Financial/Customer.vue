<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>人工充值</span>
    </div>
    <el-form :model="customerData" @submit.native.prevent="postCustomerData">
      <el-form-item>
        <el-input v-model="customerData.phone" placeholder="请输入手机号"
          ><template slot="prepend">充值手机号</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="customerData.Alipay_account"
          placeholder="请输入支付宝账号"
          ><template slot="prepend">支付宝账号</template></el-input
        >
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="customerData.Alipay_name"
          placeholder="请输入支付宝姓名"
          ><template slot="prepend">支付宝姓名</template></el-input
        >
      </el-form-item>
      <el-form-item>
        <el-input v-model="customerData.wb_fee" placeholder="请输入充值金额"
          ><template slot="prepend">充值的金额</template></el-input
        >
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="customerData.wb_remark"
          placeholder="请输入备注"
          ><template slot="prepend">备注---可选</template></el-input
        >
      </el-form-item>
      <el-form-item>
        <el-button native-type="submit" type="primary" icon="el-icon-finished"
          >充值</el-button
        >
      </el-form-item>
    </el-form>
  </el-card>
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
      const res = this.$http.post(`/admin/recharge`, this.customerData);
      if (res.statusCode) {
        this.$message({ type: "success", message: "充值成功！", offset: 10 });
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
