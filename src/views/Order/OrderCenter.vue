<template>
  <el-tabs :tab-position="position" class="vh-80">
    <el-tab-pane label="订单中心">
      <order-record />
    </el-tab-pane>
    <el-tab-pane label="申诉管理">
      <order-appeal />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      position: "top"
    };
  }
};
</script>
