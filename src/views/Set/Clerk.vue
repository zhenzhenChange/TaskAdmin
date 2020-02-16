<template>
  <el-tabs :tab-position="positon" class="vh-80">
    <el-tab-pane class="pane" label="接单会员初始设置">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>初始参数</span>
          <el-button class="btn" type="text" @click="saveSet">保存</el-button>
        </div>
        <div>
          <el-input v-model="defaultSet.su_holdLimit">
            <template slot="prepend">最多同时几单未完成</template>
          </el-input>
          <el-input class="mt-20" v-model="defaultSet.orderLimit">
            <template slot="prepend">成功率超出自动封号</template>
          </el-input>
          <div>
            <span class="exCode">邀请码是否为必填项：</span>
            <el-switch
              class="switch"
              v-model="defaultSet.su_isExtensionCodeReq"
              active-text="是"
              inactive-text="否"
              :active-value="true"
              :inactive-value="false"
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
            v-model="defaultSet.su_recvAnno"
            clearable
          ></el-input>
        </div>
      </el-card>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      textarea: "",
      positon: "top",
      defaultSet: { orderLimit: "", su_recvAnno: "", su_holdLimit: "", su_isExtensionCodeReq: "" },
    };
  },
  created() {
    this.getData();
  },
  computed: {
    ...mapState({ userID: state => state.userID }),
  },
  methods: {
    async getData() {
      const res = await this.$http.get("/admin/setup/get");
      this.defaultSet = res.data;
    },
    async saveSet() {
      await this.$http.post(`/admin/setLimit`, {
        uid: this.userID,
        limit: this.defaultSet.orderLimit,
      });
      const res = await this.$http.post(`/admin/setup/defaultClerkSet`, {
        uid: this.userID,
        su_holdLimit: this.defaultSet.su_holdLimit,
        su_isExtensionCodeReq: this.defaultSet.su_isExtensionCodeReq ? 1 : 0,
      });
      if (res.status === 200 && JSON.parse(res.status)) {
        this.$message({ type: "success", message: "保存成功", offset: 10 });
      }
    },
    async sendNotice() {
      const res = await this.$http.post(`/admin/setup/setRecvAnno`, {
        uid: this.userID,
        su_recvAnno: this.defaultSet.su_recvAnno,
      });
      if (res.status === 200 && JSON.parse(res.data.status)) {
        this.$message({ type: "success", message: "发布成功！", offset: 10 });
        this.getData();
      }
    },
    changeValue(value) {
      this.su_isExtensionCodeReq = value;
    },
  },
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
