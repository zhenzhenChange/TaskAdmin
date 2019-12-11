<template>
  <el-tabs :tab-position="'top'" class="vh-80">
    <el-tab-pane label="流水中心">
      <financial-capital></financial-capital>
    </el-tab-pane>
    <el-tab-pane label="人工充值">
      <financial-customer></financial-customer>
    </el-tab-pane>
    <el-tab-pane label="提现处理">
      <financial-drawl></financial-drawl>
    </el-tab-pane>
  </el-tabs>
</template>