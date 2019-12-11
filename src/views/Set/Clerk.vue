<template>
  <el-tabs :tab-position="positon" class="vh-80">
    <el-tab-pane class="pane" label="接单会员初始设置">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>初始参数</span>
          <el-button class="btn" type="text" @click="saveSet">保存</el-button>
        </div>
        <div>
          <el-input v-model="su_holdLimit">
            <template slot="prepend">最多同时几单未完成</template>
          </el-input>
          <div>
            <span class="exCode">邀请码是否为必填项：</span>
            <el-switch
              class="switch"
              v-model="su_isExtensionCodeReq"
              active-text="是"
              inactive-text="否"
              active-value="1"
              inactive-value="0"
              @change="changeValue"
            ></el-switch>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>接单端公告发布</span>
          <el-button class="btn" type="text" @click="sendNotice">发布</el-button>
        </div>
        <div>
          <el-input
            resize
            type="textarea"
            rows="6"
            placeholder="请输入内容"
            v-model="textarea"
            clearable
          ></el-input>
        </div>
      </el-card>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      su_holdLimit: "",
      su_isExtensionCodeReq: 1,
      textarea: "",
      positon: "top"
    };
  },
  methods: {
    async saveSet() {
      const clerkData = {
        su_isExtensionCodeReq: this.su_isExtensionCodeReq,
        userType: "接单端"
      };
      const limitRes = await this.$http.post(
        `/setup/limitHold/${this.su_holdLimit}`
      );
      const codeRes = await this.$http.post(`/setup/isExtCodeReq/${clerkData}`);
      if (limitRes.statusCode && codeRes.statusCode) {
        this.$message({
          type: "suceess",
          message: "保存成功",
          offset: 10
        });
      }
    },
    changeValue(value) {
      this.su_isExtensionCodeReq = value;
    },
    async sendNotice() {
      const res = await this.$http.post(`/setup/setRelesAnno/${this.textarea}`);
      if (res.statusCode) {
        this.$message({
          type: "suceess",
          message: "发布成功！",
          offset: 10
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.pane {
  display: flex;
  justify-content: space-around;
  .box-card {
    width: 480px;
    padding-bottom: 20px;
    float: left;
    .btn {
      float: right;
      padding: 3px 0;
    }
    .exCode {
      margin-top: 10px;
      float: left;
    }
    .switch {
      margin-top: 12px;
      margin-left: 10px;
      float: left;
    }
  }
}
</style>