<template>
  <el-tabs :tab-position="position" class="vh-80">
    <el-tab-pane label="总代中心"><agent-agent /></el-tab-pane>
    <el-tab-pane label="添加总代"><agent-create /></el-tab-pane>
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
