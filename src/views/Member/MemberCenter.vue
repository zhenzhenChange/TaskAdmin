<template>
  <el-tabs :tab-position="'left'" class="vh-100">
    <el-tab-pane label="接单会员中心">
      <member-clerk></member-clerk>
    </el-tab-pane>
    <el-tab-pane label="下单会员中心">
      <member-part></member-part>
    </el-tab-pane>
  </el-tabs>
</template>