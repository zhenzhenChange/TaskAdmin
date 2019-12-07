<template>
  <el-tabs :tab-position="'top'" class="vh-80">
    <el-tab-pane label="总代中心">
      <agent-agent></agent-agent>
    </el-tab-pane>
    <el-tab-pane label="添加总代">
      <agent-create></agent-create>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {};
</script>

<style>
</style>