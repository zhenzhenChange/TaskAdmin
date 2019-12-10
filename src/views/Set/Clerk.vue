<template>
  <el-tabs :tab-position="'left'" class="vh-80">
    <el-tab-pane label="接单会员初始参数设置">
      <el-row>
        <el-col :span="12">
          <el-form
            ref="form"
            :model="form"
            label-width="150px"
            class="ml-50"
            @submit.native.prevent="ClerkSetting"
          >
            <el-row>
              <el-col :span="6">
                <el-form-item label="最多同时几单未完成">
                  <el-input-number v-model="form.su_holdLimit" :precision="0" :step="1"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="1">
                <el-form-item label="邀请码是否为必填项">
                  <el-switch v-model="form.su_isExtensionCodeReq"></el-switch>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item>
                  <el-button type="primary" native-type="submit">保存</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-form
            label-width="140px"
            :label-position="'top'"
            class="ml-50"
            @submit.native.prevent="sendNotice"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item label="发布公告">
                  <el-input
                    type="textarea"
                    rows="5"
                    resize="none"
                    placeholder="请输入内容"
                    v-model="textarea"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="mt-20">
              <el-col :span="12">
                <el-form-item>
                  <el-button type="primary" native-type="submit">发布</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      form: {
        su_holdLimit: "",
        su_isExtensionCodeReq: ""
      },
      textarea: ""
    };
  },
  methods: {
    ClerkSetting() {
      // console.log("submit!");
    },
    sendNotice() {}
  }
};
</script>