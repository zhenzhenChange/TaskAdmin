<template>
  <el-tabs :tab-position="position" class="vh-80">
    <el-tab-pane label="接单会员中心">
      <member-clerk />
    </el-tab-pane>
    <el-tab-pane label="下单会员中心">
      <member-part />
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
