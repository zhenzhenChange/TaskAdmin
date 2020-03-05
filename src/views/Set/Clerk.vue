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
          <el-input class="mt-20" v-model="defaultSet.todayLimit">
            <template slot="prepend">限制用户当天接单量</template>
          </el-input>
          <el-input class="mt-20" v-model="defaultSet.orderLimit">
            <template slot="prepend">平台新用户接单超出</template>
            <template slot="append">单之后记录成功率</template>
          </el-input>
          <el-input class="mt-20" v-model="defaultSet.su_MinSuccessRate">
            <template slot="prepend">用户接单成功率小于</template>
            <template slot="append">%之后将自动封号</template>
          </el-input>
          <div>
            <span class="exCode">邀请码是否为必填项：</span>
            <el-switch
              class="switch"
              active-text="是"
              inactive-text="否"
              :active-value="true"
              @change="changeValue"
              :inactive-value="false"
              v-model="defaultSet.su_isExtensionCodeReq"
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
            rows="6"
            clearable
            type="textarea"
            placeholder="请输入内容"
            v-model="defaultSet.su_recvAnno"
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
      defaultSet: {
        orderLimit: "",
        todayLimit: "",
        su_MinSuccessRate: "",
        su_recvAnno: "",
        su_holdLimit: "",
        su_isExtensionCodeReq: "",
      },
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
      this.defaultSet.su_MinSuccessRate = res.data.su_MinSuccessRate * 100;
    },
    async saveSet() {
      if (this.defaultSet.su_MinSuccessRate < 0 || this.defaultSet.su_MinSuccessRate > 100) {
        this.$message.error({ message: "成功率设置要在1-100之间,且是整数", offset: 10 });
        return;
      }
      await this.$http.post(`/admin/setLimit`, {
        uid: this.userID,
        limit: this.defaultSet.orderLimit,
      });
      await this.$http.post(`/admin/setTodayLimit`, {
        todayLimit: this.defaultSet.todayLimit,
      });
      await this.$http.post(`/admin/adminSetSuss`, {
        uid: this.userID,
        su_MinSuccessRate: this.defaultSet.su_MinSuccessRate / 100,
      });
      const res = await this.$http.post(`/admin/setup/defaultClerkSet`, {
        uid: this.userID,
        su_holdLimit: this.defaultSet.su_holdLimit,
        su_isExtensionCodeReq: this.defaultSet.su_isExtensionCodeReq ? 1 : 0,
      });
      if (res.status === 200 && JSON.parse(res.status)) {
        this.$message.success({ message: "保存成功", offset: 10 });
        this.getData();
      }
    },
    async sendNotice() {
      const res = await this.$http.post(`/admin/setup/setRecvAnno`, {
        uid: this.userID,
        su_recvAnno: this.defaultSet.su_recvAnno,
      });
      if (res.status === 200 && JSON.parse(res.data.status)) {
        this.$message.success({ message: "发布成功！", offset: 10 });
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
