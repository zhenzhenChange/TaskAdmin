<template>
  <el-tabs :tab-position="'left'" class="vh-100">
    <el-tab-pane label="订单中心">
      <order-record></order-record>
    </el-tab-pane>
    <el-tab-pane label="申诉管理">
      <order-appeal></order-appeal>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {};
</script>

<style>
</style>