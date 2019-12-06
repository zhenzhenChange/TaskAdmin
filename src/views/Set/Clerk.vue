<template>
  <el-tabs :tab-position="'left'" class="vh-100">
    <el-tab-pane label="接单会员初始参数设置">
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="最多同时几单未完成">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="邀请码是否为必填项">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="发布公告">接单公告</el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>