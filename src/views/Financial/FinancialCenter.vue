<template>
  <el-tabs :tab-position="position" class="vh-80">
    <el-tab-pane label="流水中心">
      <financial-capital />
    </el-tab-pane>
    <el-tab-pane label="人工充值">
      <financial-customer />
    </el-tab-pane>
    <el-tab-pane label="提现处理">
      <financial-drawl />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      position: "top",
    };
  },
};
</script>
