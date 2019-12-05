<template>
  <el-card class="card">
    <el-input size="medium" placeholder="输入关键字搜索" autofocus />
    <el-button @click="resetDateFilter">重置日期筛选</el-button>
    <el-button @click="resetAllFilter">重置所有筛选</el-button>
  </el-card>
</template>

<script>
export default {
  props: {
    dom: {
      type: Object
    },
    type: {
      type: String
    }
  },
  methods: {
    resetDateFilter() {
      this.dom.clearFilter(this.type);
    },
    resetAllFilter() {
      this.dom.clearFilter();
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  margin-bottom: 10px;
  display: flex;
  .el-input {
    width: 300px;
    margin-right: 30px;
  }
}
</style>